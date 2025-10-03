# Week 9: Adversarial Machine Learning Basics

## Overview & Strategic Context

Week 9 marks a critical pivot in your AI cybersecurity education—from defending systems to understanding how adversaries exploit them. This knowledge is essential for building robust defenses. As Bruce Schneier notes in his seminal work on security, "Understanding the attacker's mindset is fundamental to building secure systems."

---

## Module 1: Attack Surface of ML Systems

### The Expanded Attack Landscape

Traditional cybersecurity focused on software vulnerabilities, network perimeters, and human factors. Machine learning introduces **entirely new attack surfaces** that don't exist in conventional systems:

**1. Training Phase Vulnerabilities**
- **Data Collection Points**: ML systems require massive datasets, often aggregated from multiple sources (web scraping, user submissions, third-party vendors). Each collection point is a potential injection vector.
- **Data Storage & Pipeline**: Training data stored in databases, data lakes, or cloud storage can be compromised before the model ever sees it.
- **Training Infrastructure**: The computational resources (GPUs, distributed systems) executing training can be compromised.

**2. Model Architecture Vulnerabilities**
- **Hyperparameter Exposure**: If attackers know your model architecture, they can craft attacks more effectively.
- **Model Complexity**: Deep neural networks with millions of parameters create opacity that attackers can exploit.
- **Transfer Learning Risks**: Using pre-trained models (common practice) means inheriting potential backdoors from upstream sources.

**3. Deployment Phase Vulnerabilities**
- **Inference APIs**: Models exposed via APIs are directly accessible to attackers who can probe them systematically.
- **Model Files**: Serialized models (pickle files, TensorFlow SavedModels) can be stolen, reverse-engineered, or replaced.
- **Integration Points**: Where ML systems interact with traditional software, databases, or user interfaces.

**4. The Feedback Loop Problem**
Many production ML systems continuously learn from new data. This creates a **perpetual vulnerability window** where malicious inputs can permanently corrupt the model.

### Historical Context & Real-World Impact

The **Microsoft Tay incident (2016)** exemplifies attack surface exploitation. Within 24 hours of deployment, coordinated attackers poisoned Tay's learning mechanism through normal user interactions, transforming it from a friendly chatbot into a source of offensive content. Microsoft hadn't adequately secured the feedback loop attack surface.

**Financial Impact**: According to Gartner's 2023 research, organizations deploying ML systems without adversarial robustness testing face an average of **$2.4M in incident response costs** over three years, not counting reputational damage.

### The Trust Boundary Problem

ML systems blur traditional trust boundaries. Consider:
- User input → Training data (Should users be trusted contributors?)
- Public datasets → Model weights (Can you trust Kaggle datasets?)
- Model predictions → Business decisions (Can you trust your own model?)

**Academic Foundation**: Barreno et al.'s 2010 paper "The Security of Machine Learning" established the taxonomy we still use today, identifying the attacker's knowledge, capability, and intent as key factors in threat modeling.

---

## Module 2: Evasion Attacks (Adversarial Examples)

### The Fundamental Vulnerability

Adversarial examples exploit a **counterintuitive property** of neural networks: high-dimensional decision boundaries are extraordinarily sensitive to imperceptible perturbations. This isn't a bug in implementation—it's inherent to how these systems learn.

### The Mathematics of Deception

Neural networks create complex, non-linear decision boundaries in high-dimensional space. Imagine a cybersecurity IDS classifying network traffic:

**Normal Operation**:
- Benign traffic → Model → 0.02 probability malicious ✓
- Malicious traffic → Model → 0.95 probability malicious ✓

**Under Evasion Attack**:
- Malicious traffic + tiny perturbation → Model → 0.03 probability malicious ✗

The perturbation is carefully calculated to push the input **just across the decision boundary** while remaining functionally identical to humans or traditional analysis tools.

### Types of Evasion Attacks

**1. White-Box Attacks** (Complete Knowledge)
- Attacker has full access to model architecture, weights, and training data
- Can calculate optimal perturbations using gradient information
- **Fast Gradient Sign Method (FGSM)**: Discovered by Goodfellow et al. (2014), this technique uses the gradient of the loss function to determine the direction that maximally increases error
- **Real-world scenario**: Insider threat, stolen model files, or compromised ML infrastructure

**2. Black-Box Attacks** (No Internal Knowledge)
- Attacker can only query the model and observe outputs
- Uses query responses to approximate gradients
- **Transferability principle**: Adversarial examples often transfer between models trained on similar data
- **Real-world scenario**: Attacking a production API, cloud ML service

**3. Gray-Box Attacks** (Partial Knowledge)
- Attacker knows architecture but not exact weights, or vice versa
- Most realistic scenario in practice

### Cybersecurity-Specific Evasion Examples

**Malware Detection Evasion**:
- **Challenge**: Antivirus ML models analyze file binaries, API calls, and behavioral patterns
- **Attack**: Append benign-looking bytes to malware that don't affect execution but change the feature vector enough to evade detection
- **Historical case**: Researchers demonstrated in 2017 that adding specific sequences to Android APK files bypassed multiple commercial ML-based antivirus products while maintaining malicious functionality

**IDS/IPS Evasion**:
- **Challenge**: Network intrusion detection models classify packet sequences and traffic patterns
- **Attack**: Manipulate packet timing, fragmentation, or protocol fields to evade detection while maintaining attack effectiveness
- **The packet fragmentation problem**: ML models often analyze individual packets or small windows, allowing attackers to split malicious payloads across boundaries

**Phishing Detection Bypass**:
- **Challenge**: Email security uses ML to detect phishing based on content, headers, and links
- **Attack**: Systematically test variations (word substitutions, encoding changes) until the phishing email is classified as legitimate
- **2022 research**: Demonstrated that targeted perturbations to phishing URLs could reduce detection rates from 94% to 12%

### Why This Works: The Interpretability Gap

Humans and ML models "see" data fundamentally differently:
- **Humans**: Use semantic understanding, context, and holistic reasoning
- **ML Models**: Use statistical patterns in high-dimensional feature spaces

This gap means a change imperceptible or meaningless to humans can be catastrophic to the model. You can add random-looking bytes to a malware sample that don't change what the code does, but completely change what the model predicts.

### Defense Complexity

Defending against evasion attacks is challenging because:
1. **The adversary adapts**: If you harden against one attack method, they'll find another
2. **Accuracy trade-offs**: Making models more robust often reduces accuracy on normal inputs
3. **Computational cost**: Defensive techniques like adversarial training can double or triple training time

**Economic consideration**: Organizations must balance the cost of defense against the likelihood and impact of attack. Not every ML model needs adversarial robustness—a movie recommendation system faces different risks than a fraud detection system.

---

## Module 3: Data Poisoning

### The Supply Chain Attack on AI

Data poisoning is the ML equivalent of **supply chain attacks**—compromising the system at its source. If you can corrupt the training data, you control what the model learns.

### Attack Mechanics & Taxonomy

**1. Availability Attacks** (Denial of Learning)
- **Goal**: Degrade overall model performance
- **Method**: Inject mislabeled or noisy data that disrupts the learning process
- **Impact**: Model becomes unreliable across all classes
- **Motivation**: Sabotage, competitive advantage, or causing chaos
- **Detection difficulty**: Moderate—shows up in validation metrics

**2. Targeted Poisoning Attacks** (Backdoor Injection)
- **Goal**: Make the model misclassify specific inputs while performing normally otherwise
- **Method**: Inject carefully crafted training examples with a trigger pattern
- **Impact**: Model works correctly except when trigger is present
- **Motivation**: Create persistent access, bypass specific security controls
- **Detection difficulty**: Extremely hard—model appears to work correctly

**3. Clean-Label Poisoning**
- **Goal**: Achieve targeted misclassification without obviously mislabeled data
- **Method**: Inject correctly-labeled examples that subtly shift decision boundaries
- **Impact**: Even more stealthy than backdoor attacks
- **Why it works**: The poisoned data looks legitimate, passing human review

### Cybersecurity Domain Examples

**Spam Filter Poisoning**:
- **Historical context**: Email spammers have engaged in data poisoning since the early 2000s
- **Method**: Send millions of legitimate-looking emails with spam characteristics, or spam-like emails with legitimate characteristics
- **Result**: Gradually shift the model's understanding of what constitutes spam
- **Google's response**: Implemented distributed training with data validation and anomaly detection (disclosed in research papers circa 2018)

**Intrusion Detection Poisoning**:
- **Scenario**: Attacker has limited access to generate training data (e.g., a compromised IoT device)
- **Method**: Generate benign-appearing traffic with subtle patterns that, when learned, create a blind spot
- **Long-term strategy**: Over months, gradually condition the IDS to ignore certain attack patterns
- **Real-world observation**: Researchers demonstrated this against Snort-based ML systems in 2019

**Malware Classification Poisoning**:
- **VirusTotal problem**: Public malware repositories can be poisoned by submitting misclassified samples
- **Method**: Submit actual malware labeled as benign (or vice versa) to public datasets
- **Industry response**: Major security vendors now curate proprietary datasets and use multi-source verification

### The Federated Learning Vulnerability

Federated learning—where models train on decentralized data without centralized collection—introduces unique poisoning vectors:

**Byzantine Attacks in FL**:
- Malicious participants send poisoned gradient updates
- Even a small percentage of compromised participants can corrupt the global model
- **Financial services concern**: Banks collaborating on fraud detection models face this exact risk

### Economic & Ethical Dimensions

**Cost-Benefit for Attackers**:
- **Low-cost entry**: Poisoning attacks can be executed with minimal resources
- **High impact**: Successfully poisoned models can remain compromised indefinitely
- **Deniability**: Poisoning can appear as natural data drift or honest mistakes

**Cost-Benefit for Defenders**:
- **Data validation overhead**: Implementing robust data validation is expensive
- **Delayed deployment**: Thorough data vetting slows model iteration
- **ROI challenge**: Proving the value of prevention is difficult

**Research finding** (IBM Security, 2023): Organizations that implemented comprehensive data provenance and validation reduced poisoning-related incidents by 73%, but increased data preparation costs by 40%.

### The Trust Problem in Crowdsourced Data

Many ML systems rely on crowdsourced labels:
- **reCAPTCHA**: Humans label images that train vision models
- **Waze**: Users report traffic conditions
- **Virus Total**: Community submits malware samples

Each creates a **poisoning opportunity**. Attackers can contribute strategically malicious labels over time.

---

## Module 4: Model Inversion & Extraction

### The Intellectual Property & Privacy Threat

These attacks transform ML models from assets into **information disclosure vulnerabilities**. They don't just compromise the model—they expose the data and knowledge embedded within it.

### Model Extraction (Model Stealing)

**Attack Objective**: Recreate a victim's ML model with comparable accuracy using only query access.

**How It Works**:
1. **Query the target model** with carefully chosen inputs
2. **Record predictions** (often including confidence scores)
3. **Use these input-output pairs as training data** for your own model
4. **Iteratively refine** your replica model

**Why It Succeeds**:
- Modern ML APIs return rich information (confidence scores, top-k predictions)
- Transfer learning means similar architectures converge to similar solutions
- Query costs are often low relative to training costs

**Cybersecurity Implications**:

**Circumventing Security Defenses**:
- **Scenario**: A company deploys an expensive ML-based fraud detection system
- **Attack**: Competitor extracts the model through systematic queries
- **Impact**: Competitor gains equivalent capability without R&D investment; fraudsters can test against local replica

**Real-World Case Study**: In 2016, researchers demonstrated extracting Amazon's and BigML's commercial ML models with >90% fidelity using 1,650 queries—costing approximately $30 in API fees to steal what took millions to develop.

**Economic Impact**:
- **Average enterprise ML model cost**: $500K - $5M (including data acquisition, expertise, compute)
- **Average extraction cost**: $20 - $10K (depending on query limits and sophistication)
- **ROI for attacker**: 50:1 to 250,000:1

### Model Inversion (Privacy Attacks)

**Attack Objective**: Reconstruct training data from a trained model—exposing sensitive information the model memorized.

**How It Works**:
1. **Exploit model memorization**: ML models don't just learn patterns—they memorize specific examples
2. **Use gradient information** (white-box) or query optimization (black-box) to reconstruct inputs
3. **Target models with high capacity** (overparameterized models memorize more)

**Critical Privacy Scenarios**:

**Healthcare ML Systems**:
- **Scenario**: Hospital trains disease prediction model on patient records
- **Attack**: Researcher with model access reconstructs individual patient data
- **Regulation violation**: HIPAA, GDPR—massive legal exposure
- **2015 demonstration**: Researchers reconstructed faces from facial recognition models with recognizable accuracy

**Financial Fraud Detection**:
- **Scenario**: Bank's fraud model trained on transaction patterns
- **Attack**: Extract transaction details from model behavior
- **Competitive intelligence**: Reveals bank's customer base, transaction volumes, fraud patterns

**Biometric Authentication**:
- **Scenario**: ML-powered fingerprint or facial recognition
- **Attack**: Reconstruct biometric templates from the model
- **Identity theft risk**: Stolen biometrics cannot be changed like passwords

### Membership Inference Attacks

A **related but distinct threat**: Determining whether specific data was in the training set.

**Why This Matters**:
- Confirms someone used a particular service (privacy breach)
- Reveals proprietary dataset composition (competitive intelligence)
- Enables targeted data poisoning (attacker knows what's in the training set)

**2017 Breakthrough**: Shokri et al. demonstrated membership inference against commercial ML APIs with >90% accuracy, fundamentally challenging the assumption that trained models "anonymize" training data.

### The Differential Privacy Defense

**Differential Privacy** (DP) provides mathematical guarantees that model outputs don't reveal individual training examples:

**Core concept**: Add calibrated noise to model outputs or training process such that individual records become statistically indistinguishable.

**Trade-offs**:
- **Privacy gain**: Provable protection against inversion and membership inference
- **Accuracy loss**: Noise reduces model performance (typically 2-15% accuracy degradation)
- **Complexity**: Implementing DP correctly requires deep expertise

**Industry adoption**:
- **Apple**: Uses DP for iOS keyboard predictions and emoji suggestions
- **Google**: Deploys DP in Chrome usage statistics
- **U.S. Census Bureau**: Applied DP to 2020 census data

**Cost consideration**: Implementing rigorous DP can increase training time by 3-10x and requires specialized expertise ($200K+ annual salary for ML privacy engineers).

### Legal & Regulatory Framework

**GDPR (EU) implications**:
- Article 15: Right to explanation—if models enable inversion, they may violate data subject rights
- Article 25: Privacy by design—requires considering extraction risks

**CCPA (California)**:
- Model inversion could constitute "sale" of personal information
- Organizations must disclose if models enable data reconstruction

**Emerging AI-specific regulations**:
- **EU AI Act**: High-risk AI systems must demonstrate robustness against extraction
- **U.S. NIST AI RMF**: Recommends model security controls including anti-extraction measures

---

## Module 5: Practical Considerations & Defensive Strategies

### Building Robust ML Systems: Strategic Framework

Now that you understand the attack landscape, let's discuss comprehensive defense-in-depth strategies.

### 1. Detection & Monitoring

**Adversarial Example Detection**:
- **Statistical anomaly detection**: Monitor input distributions—adversarial examples often exist in low-probability regions
- **Ensemble disagreement**: Deploy multiple models; adversarial examples may fool one but not others
- **Input transformation**: Apply random transformations (cropping, noise addition); adversarial perturbations may not survive

**Data Poisoning Detection**:
- **Provenance tracking**: Maintain complete data lineage—who contributed what, when
- **Outlier detection**: Flag training samples that significantly differ from population statistics
- **Incremental learning validation**: Continuously validate model performance on trusted holdout sets

**Model Extraction Detection**:
- **Query pattern analysis**: Unusual query volumes, systematic sampling patterns, or boundary-probing behavior
- **Honeypot queries**: Intentionally wrong responses to specific synthetic queries to watermark stolen models
- **Rate limiting**: Restrict queries per user/IP, implement progressive authentication

### 2. Defensive Training Techniques

**Adversarial Training**:
- **Concept**: Include adversarial examples in training data
- **Benefit**: Model learns robust features resilient to perturbations
- **Cost**: 2-3x longer training time, 10-30% more compute resources
- **Limitation**: Only robust to attack types seen during training

**Certified Defenses**:
- **Concept**: Mathematical proofs that models are robust within specified bounds
- **Benefit**: Guaranteed robustness (no empirical uncertainty)
- **Cost**: Significant accuracy penalties (10-20%), limited to smaller models
- **Research frontier**: Active area with improving techniques

### 3. Architectural Choices

**Ensemble Methods**:
- **Logic**: Harder to fool multiple diverse models simultaneously
- **Implementation**: Train models with different architectures, random seeds, or data subsets
- **Trade-off**: Increased inference cost (3-5x), but improved robustness

**Model Compression & Quantization**:
- **Counterintuitive benefit**: Smaller, simpler models are sometimes more robust
- **Reason**: Reduced capacity = less memorization = harder to extract or invert

### 4. Operational Security

**API Design**:
- **Reduce information leakage**: Return only class labels, not confidence scores
- **Query budget**: Limit queries per user
- **Perturbation**: Add random noise to outputs
- **Monitoring**: Log and analyze all queries for suspicious patterns

**Model Deployment**:
- **Edge deployment**: Keep models on-device when possible (harder to extract)
- **Secure enclaves**: Use trusted execution environments (TEE) for sensitive models
- **Model encryption**: Encrypt model files at rest and in transit

### 5. Governance & Policy

**Risk Assessment Framework**:
1. **Identify critical models** (fraud detection, authentication, etc.)
2. **Threat modeling** specific to each model's context
3. **Cost-benefit analysis** of defensive measures
4. **Continuous monitoring** and incident response planning

**Training Data Governance**:
- **Vendor security requirements**: Contractual obligations for data providers
- **Internal data validation**: Multi-stage review before production use
- **Data retention policies**: Balance model improvement against privacy/attack surface

### 6. Business & Economic Perspective

**Investment Prioritization**:

**High Priority** (immediate implementation):
- API rate limiting and monitoring
- Basic adversarial training for critical models
- Data provenance tracking

**Medium Priority** (6-12 month horizon):
- Ensemble deployment for high-value targets
- Advanced anomaly detection
- Differential privacy for sensitive data

**Low Priority** (research/future):
- Certified defenses (still maturing)
- Homomorphic encryption (high overhead)

**ROI Calculation Framework**:
```
Defense Cost = Implementation + Ongoing Maintenance + Performance Degradation
Attack Cost = Likelihood × Impact (financial loss + reputation + regulatory)
Implement if: Attack Cost > Defense Cost × Safety Margin (typically 3-5x)
```

---

## Synthesis & Strategic Takeaways

### The Adversarial Mindset

Effective AI security requires **thinking like an attacker**:
1. **What's the weakest link?** (Often: training data or API design)
2. **What's the highest ROI attack?** (Often: data poisoning or extraction)
3. **What attack is hardest to detect?** (Often: clean-label poisoning or gradual extraction)

### Integration with Traditional Cybersecurity

Adversarial ML doesn't replace traditional security—it extends it:
- **Defense in depth still applies**: Multiple layers of protection
- **Assume breach mentality**: Plan for compromised models
- **Continuous monitoring**: Detection is as important as prevention

### The Arms Race Reality

This is an **evolving threat landscape**:
- New attacks emerge constantly (research community publishes 100+ papers annually)
- Defenses lag behind attacks (average 12-18 months)
- No silver bullet exists—only layered, adaptive defenses

### Ethical Considerations

As you learn these techniques:
- **Responsible disclosure**: If you discover vulnerabilities, report them
- **Controlled environments**: Test only in authorized labs
- **Dual-use awareness**: These techniques can harm or protect

### Preparation for Week 10+

You're now equipped to understand:
- **Week 10**: How generative AI amplifies these threats
- **Week 11**: Practical red teaming methodologies
- **Week 12**: Comprehensive attack simulation

---

## Recommended Reading & Resources

**Foundational Papers**:
1. Barreno et al. (2010) - "The Security of Machine Learning"
2. Goodfellow et al. (2014) - "Explaining and Harnessing Adversarial Examples"
3. Shokri et al. (2017) - "Membership Inference Attacks Against Machine Learning Models"

**Industry Reports**:
- NIST Special Publication 800-160 Vol. 2 Rev. 1: "Developing Cyber-Resilient Systems"
- MITRE ATLAS: "Adversarial Threat Landscape for Artificial-Intelligence Systems"
- ENISA: "Securing Machine Learning Algorithms"

**Books**:
- "Adversarial Machine Learning" by Biggio & Roli
- "Privacy-Preserving Machine Learning" by Liu et al.

This completes Week 9. You now understand the fundamental attack vectors against ML systems and the defensive strategies to counter them. This knowledge forms the foundation for the more advanced adversarial AI topics in the coming weeks.