****Week 1 – Cybersecurity Essentials****  
  
*Goal: Learn the foundations of cybersecurity concepts and set up your lab environment.*  
  
⸻  
##   
## **Day 1 – CIA Triad (Confidentiality, Integrity, Availability)**  
  
### **📖 Concepts to Learn**  
  
* **Confidentiality** → Preventing unauthorized access to information.  
  
    * Example: Encryption, access controls.  
  
* **Integrity** → Ensuring data is accurate, untampered, and trustworthy.  
  
    * Example: Hashing, digital signatures, checksums.  
  
* **Availability** → Making sure systems and data are accessible when needed.  
  
    * Example: Redundancy, DDoS protection, backups.  
  
🔑 **Why it matters:** Every security control or defense mechanism you’ll learn over the next 16 weeks ultimately maps back to the CIA Triad.  
⸻  
### **🛠️ Hands-On Exercise**  
  
1. **Confidentiality Demo**  
  
    * Encrypt a text file using **GPG** (Linux/Mac) or **OpenSSL** (Windows/Linux).  
    * Command example (Linux/Mac):  
  
```
gpg -c secret.txt

```

	* Try decrypting it again to see how access is controlled.
  
2. **Integrity Demo**  
  
    * Generate a file hash:  
  
```
sha256sum secret.txt

```

    * Edit the file slightly and hash again → notice the change.  
  
3. **Availability Simulation**  
  
    * Turn off your firewall or block a service temporarily.  
    * Notice how it affects system availability.  
    * Restart and configure redundancy where possible.  
  
⸻  
###   
### **📚 Suggested Readings & Videos**  
  
* [NIST Cybersecurity Framework Introduction](https://www.nist.gov/cyberframework)  
* Book excerpt: *Computer Security: Principles and Practice* by Stallings (CIA section)  
* Short video: “CIA Triad Explained Simply” (YouTube, ~5 min)  
  
⸻  
###   
### **📝 Quick Quiz (Self-check)**  
  
1. What is the difference between **confidentiality** and **integrity**?  
2. Give one **real-world example** where availability is critical.  
3. Which part of the CIA triad would a ransomware attack violate the most?  
  
⸻  
  
📌 **Deliverable (end of Day 1):**  
  
* Write a short paragraph (5–7 sentences) connecting **CIA Triad principles** to AI security. (Hint: Think about training data integrity, model confidentiality, and AI system uptime.)  
  
⸻  
##   
## **Day 2 – AAA: Authentication, Authorization, and Accounting**  
  
### **📖 Concepts to Learn**  
  
**AAA is the backbone of access control in cybersecurity:**  
  
1. **Authentication** – Verifying *who* you are.  
  
    * Examples: Passwords, biometrics, multi-factor authentication (MFA).  
    * Tools: LDAP, Active Directory, RADIUS.  
  
2. **Authorization** – Determining *what* you’re allowed to do.  
  
    * Examples: File permissions, role-based access control (RBAC), least privilege principle.  
  
3. **Accounting (Auditing)** – Tracking *what* you did.  
  
    * Examples: Logging user activity, audit trails, session tracking.  
  
🔑 **Why it matters for AI security:**  
  
* Authentication → Ensures only trusted engineers/data scientists can train or deploy models.  
* Authorization → Controls which teams can access sensitive training datasets.  
* Accounting → Logs actions, useful for investigating poisoning or model tampering.  
  
⸻  
###   
### **🛠️ Hands-On Exercise**  
  
**Part 1: Authentication**  
  
* On Linux/Mac: Create a new user and set a password.  
  
```
sudo adduser testuser
su - testuser

```
  
* Enable **SSH key authentication** for secure login (instead of passwords).  
  
**Part 2: Authorization**  
  
* Restrict file access with permissions:  
  
```
echo "Sensitive Data" > secret.txt
chmod 600 secret.txt

```
  
    * Try opening it as a different user — you should be denied.  
  
**Part 3: Accounting**  
  
* View login activity:  
  
```
last
who

```
  
* Enable system logging (Linux: ==journalctl== or ==/var/log/auth.log==).  
* Note how logs record authentication attempts.  
  
⸻  
###   
### **📚 Suggested Readings & Videos**  
  
* NIST SP 800-63B: *Digital Identity Guidelines* (Authentication)  
* OWASP: [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)  
* Short video: “Authentication vs. Authorization Explained” (YouTube, ~6 min)  
  
⸻  
###   
### **📝 Quick Quiz (Self-check)**  
  
1. What is the difference between **authentication** and **authorization**?  
2. Why is **accounting** crucial in forensic investigations?  
3. How would MFA improve authentication security in AI model access?  
  
⸻  
  
📌 **Deliverable (end of Day 2):**   
Write a short security scenario (5–6 sentences) describing:  
  
* A system with strong authentication but weak authorization.  
* How that system could be exploited.  
* How you would fix it.  
  
⸻  
##   
## **Day 3 – Network Security Basics (Firewalls, IDS, IPS)**  
  
### **📖 Concepts to Learn**  
  
**1. Firewalls**  
  
* Control network traffic based on predefined rules.  
* Types:  
  
    * Packet-filtering firewall (filters based on IP, port, protocol).  
    * Stateful inspection firewall (tracks session state).  
    * Next-Gen Firewall (NGFW) → includes deep packet inspection & intrusion prevention.  
  
**2. IDS (Intrusion Detection System)**  
  
* Monitors traffic for suspicious activity and generates alerts.  
* Types:  
  
    * **NIDS** (Network-based IDS) → monitors network traffic.  
    * **HIDS** (Host-based IDS) → monitors logs and activities on a single host.  
  
**3. IPS (Intrusion Prevention System)**  
  
* Similar to IDS, but can take action (block, drop, reset connections).  
* IPS is often integrated with modern firewalls.  
  
🔑 **Why it matters for AI security:**  
  
* Firewalls protect AI models deployed via APIs.  
* IDS detects unusual traffic → can spot adversarial probes.  
* IPS helps prevent data exfiltration or poisoning attempts.  
  
⸻  
###   
### **🛠️ Hands-On Exercise**  
  
**Part 1: Firewall**  
  
* On Linux, check firewall status:  
  
```
sudo ufw status

```
  
* Block a specific port (e.g., port 22 for SSH):  
  
```
sudo ufw deny 22

```
  
* Re-enable it after testing:  
  
```
sudo ufw allow 22

```
  
  
**Part 2: IDS**  
  
* Install **Snort** (popular open-source IDS).  
  
```
sudo apt install snort -y

```
  
* Run Snort in IDS mode:  
  
```
sudo snort -A console -q -c /etc/snort/snort.conf -i eth0

```
  
* Generate some network activity (ping or curl) and see if Snort logs it.  
  
**Part 3: IPS (Optional Advanced)**  
  
* Configure **Suricata** (IDS/IPS).  
* Run it in IPS mode to automatically block malicious traffic.  
  
⸻  
###   
### **📚 Suggested Readings & Videos**  
  
* Book excerpt: *Network Security Essentials* by William Stallings  
* [Snort Documentation](https://www.snort.org/documents)  
* Short video: “IDS vs IPS Explained” (YouTube, ~8 min)  
  
⸻  
###   
### **📝 Quick Quiz (Self-check)**  
  
1. What’s the key difference between an **IDS** and an **IPS**?  
2. Which type of firewall is best suited for cloud environments?  
3. How could an IDS help detect adversarial probing of an AI model API?  
  
⸻  
  
📌 **Deliverable (end of Day 3):**   
Draw (or describe in text) a **simple network diagram** showing:  
  
* A firewall  
* An IDS  
* A protected AI server hosting a model   
* Explain how traffic flows and where detection/response happens.  
⸻  
