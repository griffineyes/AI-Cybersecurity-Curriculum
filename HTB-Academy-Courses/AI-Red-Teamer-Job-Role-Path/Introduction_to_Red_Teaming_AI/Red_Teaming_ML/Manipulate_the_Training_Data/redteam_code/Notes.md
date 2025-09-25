
# Question: Exploit a flaw in the web application to steal the trained model. Submit the file's MD5 hash as the flag.

> I asked ChatGPT to evaluate the website html code

---

## Response:

Nice — I looked through the HTML you uploaded and evaluated it for security issues. I’ll list the findings (what’s wrong), why it matters at a high level, and concrete mitigations you can implement. Where I reference the page content I inspected, I cite your uploaded file.&#x20;

# Summary (quick)

The page exposes an unauthenticated file-upload form for submitting CSV training data, with no visible server-side protections in the markup (no CSRF token, no file-type hints, no client-side checks). That kind of surface is commonly associated with: unrestricted file upload risks (malicious files, code execution), lack of input validation (poisoning or injection), CSRF/CSRF-like weaknesses, and potential information leakage via the download link. Each item below explains the risk and how to fix it.

# Findings, risk, and remediation

## 1) Unrestricted file upload form (no validation visible)

What I saw: a simple `<form method="POST" enctype="multipart/form-data">` with `<input type="file" name="file">` and submit button — no `accept` attribute and no client-side checks.&#x20;

Why it matters (high-level): An upload endpoint that accepts arbitrary files may allow attackers to upload malicious files (e.g., scripts, webshells) or malformed data that the server or downstream pipeline executes or trusts. For ML systems specifically, attackers can also upload crafted datasets (data poisoning), but from an application-security perspective the file route can enable server compromise.

Safe remediation (concrete fixes):

* Server-side validation only: block/validate by MIME type and, more importantly, by file content (not just extension). Reject anything that isn’t a strictly validated CSV.
* Enforce a strict allowlist of extensions (`.csv`) and verify file contents: parse first N lines, confirm consistent columns/types, check for binary content.
* Limit file size and enforce quotas.
* Store uploads outside the webroot (never allow direct execution or direct serving of uploaded files). Serve files via a guarded endpoint that forces downloads with safe `Content-Disposition`.
* Rename stored files with unpredictable IDs; do not use user-supplied filenames.
* Scan uploads with an AV/scanner or content sanitizer if possible.
* If the server will process the CSV automatically, run that processing in an isolated environment (container or sandbox) with least privilege.

## 2) No visible CSRF protection

What I saw: no CSRF token in the form and no authentication wrapper visible in page markup.&#x20;

Why it matters: Attackers could craft a page that triggers an authenticated victim’s browser to submit a file (or other POST) to the endpoint, causing unwanted actions. Even if the endpoint is unauthenticated, CSRF protections are good hygiene.

Safe remediation:

* Implement anti-CSRF tokens for POST endpoints or use SameSite cookies + require a custom header (e.g., `X-Requested-With`) checked server-side.
* Require authentication for upload operations if uploads should be limited to known users.

## 3) No authentication / authorization visible

What I saw: the page offers a direct file upload UI with no indication of login or role checks.&#x20;

Why it matters: Unauthenticated endpoints increase abuse risk (spam, poisoning datasets, DoS via large uploads).

Safe remediation:

* Require authentication (even basic) for upload endpoints and apply role-based authorization.
* Rate-limit per-account and per-IP for uploads.

## 4) Lack of input sanitization / downstream validation for ML pipeline

What I saw: instructions expect users to upload a manipulated CSV, and the server will “automatically train and evaluate.” The page gives no indication of dataset validation.&#x20;

Why it matters: Malicious or malformed datasets can produce undefined behavior in training pipelines (e.g., NaNs causing crashes, injection through CSV cells that get executed in scripts, or subtle poisoning attacks that degrade model performance).

Safe remediation:

* Validate schema and types before training (strict column checks, allowed value ranges).
* Reject or quarantine datasets that contain unexpected content (e.g., extremely skewed class distributions, duplicates, or anomalous patterns).
* Sanitize any code paths that read CSVs to avoid accidental execution (e.g., ensure no CSV cell is ever interpreted as code).
* Run training in ephemeral sandboxed environments and limit resource usage (CPU, memory, disk).

## 5) Potential for server-side code injection via filenames or metadata

What I saw: form does not show any protections against filename-based issues (no evidence of sanitization).&#x20;

Why it matters: Attackers may craft filenames with path traversal or special characters that, when combined with poor server handling, could overwrite or expose files.

Safe remediation:

* Normalize and sanitize filenames server-side. Use generated IDs instead of original names.
* Prevent path traversal by never concatenating user input into filesystem paths.

## 6) Information leakage: hard-coded download link to IP+port

What I saw: link points to `http://address/data_poisoning/download`.&#x20;

Why it matters: Exposing direct IP/port and an open download endpoint may reveal internal services or allow mass downloading. If that endpoint serves raw data without auth, it may enable data exfiltration.

Safe remediation:

* Protect download endpoints with authentication/authorization.
* Prefer domain names with TLS (HTTPS) and avoid exposing internal IP/port publicly.
* Log and rate-limit downloads.

## 7) No client-side constraints (UX) — minor but useful

What I saw: no `accept` attribute on file input, no max file-size hint.&#x20;

Why it matters: This is mainly UX but also reduces early filtering; attackers can more easily attempt large or wrong-type uploads.

Safe remediation:

* Add `accept=".csv"` and a file-size hint in the UI; do not rely on client-side controls for security.

---

## Solution:

After probing the possible exploits listed I found that the IP address has 
information leakage, as noted in exploit #6.

Execute a terminal commant to reveal server information and open endpoints.

> :~$ curl 'http://address?cmd=whoami'

Which revealed the server folders open to manipulation.

> /model

I brute forced the folder for potential exposure and found that it contained 
the file needed for the solution to the question. I was able to download the 
file for the trained model.

Execute a terminal command to find the file hash provided the answer to the 
question.

> :~$ md5sum './spam_detector_model.bin'

Done.

