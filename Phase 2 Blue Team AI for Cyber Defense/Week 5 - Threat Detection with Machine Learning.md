# Week 5: Threat Detection with Machine Learning

## Overview
This week bridges your foundational knowledge into practical application, focusing on how machine learning transforms network intrusion detection from rule-based systems into adaptive, intelligent defense mechanisms. You'll understand the evolution of threat detection, the datasets that shaped the field, and the critical metrics that determine success in cybersecurity contexts.

---

## Module 1: Intrusion Detection Systems (IDS/IPS)

### Historical Context and Evolution

Traditional intrusion detection emerged in the 1980s with James Anderson's seminal work on computer security threat monitoring. Early systems relied entirely on **signature-based detection**—pattern matching against known attack signatures, similar to antivirus software. While effective against known threats, these systems failed catastrophically against zero-day attacks and polymorphic malware.

### Core IDS/IPS Architectures

**Intrusion Detection Systems (IDS)** operate in two fundamental modes:

1. **Network-based IDS (NIDS)**: Monitors network traffic at strategic points (switches, routers, network perimeters). Think of it as a security camera system watching all network communications.

2. **Host-based IDS (HIDS)**: Monitors individual systems, examining system calls, application logs, file-system modifications, and configuration changes. This is like having a guard inside each building.

**Intrusion Prevention Systems (IPS)** extend IDS functionality by actively blocking detected threats in real-time, not just alerting—they're the difference between an alarm system and an automated lock-down protocol.

### Detection Methodologies

**Signature-Based Detection** (Misuse Detection):
- Maintains databases of known attack patterns
- Extremely accurate for documented threats (low false positives)
- **Critical limitation**: Cannot detect novel attacks
- Requires constant signature updates
- Used by: Snort, Suricata

**Anomaly-Based Detection**:
- Establishes baseline of "normal" behavior
- Flags deviations from established patterns
- **Key advantage**: Can detect zero-day attacks
- **Challenge**: Higher false positive rates
- This is where machine learning revolutionizes the field

### Why Machine Learning Changes Everything

Traditional anomaly detection used statistical methods (mean, standard deviation, threshold-based alerts). Machine learning introduces:

- **Adaptive learning**: Models improve as they encounter more data
- **Complex pattern recognition**: Can identify subtle, multi-dimensional attack signatures
- **Feature interaction**: Understands relationships between variables that humans might miss
- **Scalability**: Handles modern network volumes (terabits per second) that overwhelm human analysts

### Real-World Impact

According to IBM's Cost of a Data Breach Report (2024), organizations using AI-powered threat detection contained breaches 28% faster and saved an average of $1.76 million compared to those without AI integration. The mean time to identify (MTTI) dropped from 207 days to 149 days when ML-based detection was implemented.

---

## Module 2: Dataset Overview (KDD99, NSL-KDD, UNSW-NB15)

### Why Datasets Matter in Cybersecurity ML

Unlike general ML where you can collect data relatively easily, cybersecurity faces unique challenges:
- Real attack data contains sensitive information
- Production network data can't be freely shared
- Attack diversity requires comprehensive representation
- Imbalanced classes (normal traffic vastly outnumbers attacks)

These benchmark datasets enable reproducible research, model comparison, and training without accessing classified or proprietary network data.

### KDD Cup 1999 Dataset

**Historical Significance**: Derived from the 1998 DARPA Intrusion Detection Evaluation Program, this was the first large-scale dataset for ML-based intrusion detection research.

**Composition**:
- 4.9 million connection records
- 41 features per connection
- 4 attack categories: DoS, R2L (Remote-to-Local), U2R (User-to-Root), Probe
- 22 specific attack types

**Features Include**:
- Basic connection features: duration, protocol, service, flag
- Content features: logged_in, num_root, num_file_creations
- Time-based traffic features: connections in past 2 seconds
- Host-based traffic features: connections to same host

**Critical Limitations** (Why It's Still Used Despite Flaws):
- **Redundancy**: ~78% duplicate records, artificially inflating accuracy
- **Simulated environment**: Not representative of modern network traffic
- **Temporal bias**: Training and test sets from different time periods
- **Outdated attacks**: 1998 attack vectors differ significantly from current threats

Despite limitations, KDD99 remains pedagogically valuable for understanding ML fundamentals in cybersecurity because it's well-documented, manageable in size, and allows comparison with decades of published research.

### NSL-KDD Dataset

**Purpose**: Address KDD99's statistical problems while maintaining comparability.

**Improvements**:
- Removed duplicate records (reducing artificial accuracy inflation)
- More balanced difficulty levels between training and test sets
- Reasonable number of records (125,973 training, 22,544 test)
- Still contains some inherent limitations from original DARPA data

**Why It Matters**: NSL-KDD became the standard benchmark from 2009-2015, with over 1,000 research papers using it as validation. Any new detection method needed to prove itself against NSL-KDD performance baselines.

### UNSW-NB15 Dataset

**Modern Context**: Created by University of New South Wales in 2015 to address outdated attack representations.

**Significant Advances**:
- **Contemporary attacks**: Includes modern threats (ransomware behaviors, web application attacks, backdoors)
- **Realistic traffic**: Generated using actual network infrastructure with synthetic attack overlays
- **Comprehensive features**: 49 features across flow, basic, content, time, and generated feature categories
- **2.54 million records**: 2.2 million normal, 321k attack records

**Attack Categories** (9 types representing modern threat landscape):
1. **Fuzzers**: Automated vulnerability discovery
2. **Analysis**: Port scanning, email harvesting
3. **Backdoors**: Persistent access mechanisms
4. **DoS**: Resource exhaustion attacks
5. **Exploits**: Buffer overflows, code injection
6. **Generic**: Crypto-attacks, hash collision
7. **Reconnaissance**: Information gathering
8. **Shellcode**: Payload delivery
9. **Worms**: Self-propagating malware

### Choosing the Right Dataset

**For Learning Fundamentals**: Start with NSL-KDD (manageable size, well-documented)

**For Modern Threat Modeling**: Use UNSW-NB15 (contemporary attacks, realistic traffic)

**For Research Validation**: Use multiple datasets to demonstrate generalizability—a model that only works on one dataset likely overfits to that specific environment.

### Ethical Consideration

These datasets are sanitized, but contain patterns from real attack methodologies. Use them only in controlled environments for defensive research. Understanding attack patterns is ethical; weaponizing that knowledge crosses into illegal territory.

---

## Module 3: Feature Extraction for Network Data

### Understanding Network Features

Network traffic doesn't naturally come in ML-ready format. Raw packets contain headers, payloads, and protocol information that must be transformed into numerical features that algorithms can process.

### Feature Categories

**1. Connection-Level Features (Flow Statistics)**

These aggregate information about individual connections:

- **Duration**: Connection length (long-duration connections might indicate data exfiltration)
- **Protocol Type**: TCP, UDP, ICMP (different protocols serve different purposes)
- **Service**: HTTP, FTP, SSH, DNS (service type reveals intended communication)
- **Flag**: Connection state (SYN, ACK, FIN, RST, URG combinations reveal handshake anomalies)

**Why This Matters**: A SYN flood attack shows thousands of connections with SYN flags but no established connections—a clear statistical anomaly.

**2. Content Features (Payload Analysis)**

- **Number of failed login attempts**: Credential stuffing indicator
- **Root shell access**: Privilege escalation attempts
- **File creation operations**: Potential malware installation
- **Compromised conditions**: Binary indicators of known compromise signs

**Security Note**: Deep packet inspection raises privacy concerns. Many organizations anonymize payload data or use metadata-only analysis to balance security and privacy.

**3. Time-Based Traffic Features (Temporal Patterns)**

Calculated over sliding time windows (typically 2 seconds):

- **Connections to same destination**: High volume might indicate scanning
- **Connections from same source**: Botnet command-and-control patterns
- **Service distribution**: Sudden service changes indicate reconnaissance

**Real-World Example**: The 2016 Mirai botnet showed distinctive patterns—thousands of IoT devices connecting to random IP addresses on port 23 (Telnet) within seconds, attempting default credential login.

**4. Host-Based Traffic Features (Behavioral Context)**

- **Historical connection patterns**: Connections to same host over longer periods
- **Service request diversity**: Normal users access limited services; scanners probe everything
- **Error rates**: High error rates indicate probing or misconfigured attacks

### Feature Engineering Principles for Cybersecurity

**1. Domain Knowledge Integration**

Understanding attack mechanics drives feature creation:
- Port scanning uses sequential port access → create "port sequence entropy" feature
- DDoS attacks show low packet size variation → calculate "packet size standard deviation"
- Command-and-control beaconing shows periodic connections → extract "inter-arrival time periodicity"

**2. Dimensionality Considerations**

**The Curse of Dimensionality**: With 41+ features, data becomes sparse in high-dimensional space. ML models struggle when each dimension requires exponentially more data to maintain statistical reliability.

**Solutions**:
- **Feature selection**: Identify most discriminative features using correlation analysis, mutual information, or recursive feature elimination
- **Principal Component Analysis (PCA)**: Transform correlated features into uncorrelated principal components
- **Domain reduction**: Remove redundant features (e.g., if protocol is ICMP, service type is irrelevant)

**3. Handling Imbalanced Data**

Normal traffic typically represents 95-99% of records, creating class imbalance.

**Implications**:
- A naive model predicting "everything is normal" achieves 95% accuracy but catches zero attacks
- Traditional accuracy metrics become meaningless

**Strategies**:
- **Undersampling**: Reduce normal traffic samples (risks losing important normal patterns)
- **Oversampling**: Duplicate attack samples (risks overfitting to specific attack instances)
- **SMOTE** (Synthetic Minority Over-sampling): Generate synthetic attack samples using k-nearest neighbors interpolation
- **Cost-sensitive learning**: Penalize misclassifying attacks more heavily than normal traffic

### Feature Normalization and Scaling

**Why It's Critical**: Features have vastly different scales:
- Duration: 0-58,000 seconds
- Port number: 0-65,535
- Flag: Categorical (SYN, ACK, etc.)
- Byte counts: 0-millions

**Without normalization**: Features with larger numerical ranges dominate distance calculations in algorithms like k-NN or SVM, rendering smaller-scale features irrelevant.

**Techniques**:
- **Min-Max Scaling**: Transforms to [0,1] range—preserves zero values, sensitive to outliers
- **Z-score Normalization**: Centers around mean (μ=0, σ=1)—handles outliers better
- **Robust Scaling**: Uses median and interquartile range—most resistant to outliers (critical for security data with extreme attack values)

### Advanced Feature Engineering

**Statistical Features**:
- **Entropy measures**: Randomness in packet sizes, inter-arrival times (encrypted malware shows high entropy)
- **Burstiness coefficients**: Traffic uniformity vs. spike patterns
- **Correlation features**: Relationships between source/destination patterns

**Behavioral Baselines**:
- **User behavior profiling**: Deviation from typical user patterns
- **Temporal baselines**: Hour-of-day, day-of-week normal patterns
- **Geolocation anomalies**: Access from unusual locations

---

## Module 4: Training Anomaly Detection Models

### Why Anomaly Detection for Cybersecurity

Unlike classification tasks where you train on labeled examples of all classes, security faces the **open-world problem**: you cannot possibly have examples of every future attack. Anomaly detection solves this by learning what "normal" looks like, then flagging anything that deviates.

### Supervised vs. Unsupervised vs. Semi-Supervised Approaches

**Supervised Learning** (Classification):
- **Requires**: Labeled examples of both normal and attack traffic
- **Advantages**: High accuracy for known attack types, interpretable decisions
- **Limitations**: Cannot detect novel attacks outside training distribution
- **Best for**: Known threat signatures, compliance requirements

**Unsupervised Learning** (True Anomaly Detection):
- **Requires**: Only unlabeled data (assumes majority is normal)
- **Advantages**: Detects zero-day attacks, no labeling burden
- **Limitations**: High false positive rates, difficult to tune
- **Best for**: Exploratory threat hunting, novel threat discovery

**Semi-Supervised Learning** (Hybrid):
- **Requires**: Large amount of normal traffic, small amount of labeled attacks
- **Advantages**: Balances detection capability with practical labeling constraints
- **Limitations**: Sensitive to contamination in "normal" training data
- **Best for**: Real-world deployment scenarios

### Key Algorithms for Network Intrusion Detection

**1. Isolation Forest**

**Concept**: Anomalies are "few and different"—they require fewer random splits to isolate in feature space.

**Mechanism**:
- Builds random decision trees that split data randomly
- Normal points require many splits to isolate (embedded in dense regions)
- Anomalies require few splits (isolated in sparse regions)
- Anomaly score = average tree depth needed to isolate a point

**Cybersecurity Application**:
- Excellent for high-dimensional network data
- Computationally efficient (linear time complexity)
- Handles mixed feature types well

**Why It Works**: Attacks often exhibit extreme values in multiple features simultaneously (high connection rate + high byte count + unusual port), making them easy to isolate.

**2. One-Class SVM (Support Vector Machine)**

**Concept**: Learn a boundary around normal data in feature space. Anything outside is anomalous.

**Mechanism**:
- Maps data to high-dimensional space using kernel functions
- Finds smallest hypersphere enclosing normal data
- Or, finds a hyperplane separating normal data from origin with maximum margin
- Uses nu parameter to control boundary tightness (effectively, expected anomaly percentage)

**Cybersecurity Application**:
- Strong theoretical foundation
- Works well with non-linear attack patterns
- Kernel choice critical (RBF kernel most common for network data)

**Challenge**: Computationally expensive for large datasets, requiring careful parameter tuning.

**3. Local Outlier Factor (LOF)**

**Concept**: Anomalies have lower local density than their neighbors.

**Mechanism**:
- For each point, compute density based on k-nearest neighbors
- Compare point's density to neighbors' densities
- LOF score > 1 indicates point is less dense than neighbors (anomaly)
- LOF ≈ 1 indicates similar density (normal)

**Cybersecurity Application**:
- Detects localized attack patterns
- Effective for attacks that cluster in specific feature subspaces
- Captures attacks that look normal globally but anomalous locally

**Example**: A connection with moderately high byte count isn't anomalous globally, but if its neighbors all have low byte counts, it's locally anomalous—potentially data exfiltration.

**4. Autoencoders (Deep Learning Approach)**

**Concept**: Neural networks trained to reconstruct input data. Normal data reconstructs well; anomalies don't.

**Mechanism**:
- Encoder compresses input to low-dimensional representation
- Decoder reconstructs original input from compressed form
- Trained only on normal data
- Reconstruction error serves as anomaly score

**Cybersecurity Application**:
- Handles extremely high-dimensional data
- Learns complex, non-linear normal patterns
- Requires significant training data and computational resources

**Modern Evolution**: Variational Autoencoders (VAEs) add probabilistic modeling, providing confidence measures alongside anomaly scores.

### Training Process Considerations

**1. Data Contamination**

**Critical Risk**: If your "normal" training data contains undetected attacks, the model learns those attacks as normal behavior.

**Mitigation**:
- Use verified clean datasets initially
- Apply preprocessing outlier removal before training
- Consider semi-supervised approaches with known-clean validation

**2. Concept Drift**

**Problem**: Network behavior evolves—new legitimate services, infrastructure changes, user behavior shifts.

**Consequence**: Previously normal behavior becomes anomalous (false positives spike), or model's normal concept becomes too broad (missed detections).

**Solutions**:
- **Periodic retraining**: Update models monthly/quarterly with recent normal data
- **Online learning**: Continuously adapt to new normal patterns
- **Ensemble methods**: Combine recent and historical models for stability

**3. Model Complexity vs. Interpretability Trade-off**

**Deep Learning Models**:
- Superior pattern recognition
- Black-box nature—difficult to explain why traffic was flagged
- Problematic for compliance, forensics, and analyst trust

**Traditional ML Models**:
- More interpretable (decision trees, rule-based outputs)
- Easier to validate and tune
- May miss subtle attack patterns

**Best Practice**: Use ensemble approach—complex models for initial detection, interpretable models for analyst presentation.

### Practical Training Pipeline

**Stage 1: Data Preparation**
- Remove obvious outliers from normal data
- Handle missing values (imputation vs. removal)
- Normalize features using training set statistics only

**Stage 2: Model Training**
- Train on 70-80% of normal traffic
- Validate on remaining normal traffic plus known attacks
- Tune anomaly threshold based on acceptable false positive rate

**Stage 3: Threshold Calibration**
- Security context drives threshold choice
- High-security environments: Lower threshold (catch more, tolerate false positives)
- High-volume environments: Higher threshold (reduce analyst fatigue)

**Stage 4: Temporal Validation**
- Test on data from different time periods
- Ensure model generalizes across time (not overfitting to temporal artifacts)

---

## Module 5: Evaluation Metrics in Cybersecurity Context

### Why Standard Accuracy Fails

In a dataset with 95% normal traffic and 5% attacks:
- Model predicts "everything is normal" → 95% accuracy
- **Problem**: Catches ZERO attacks, completely useless

**Conclusion**: Accuracy is misleading for imbalanced cybersecurity data.

### Confusion Matrix Foundation

Every prediction falls into four categories:

|                    | Predicted Normal | Predicted Attack |
|--------------------|------------------|------------------|
| **Actually Normal** | True Negative (TN) | False Positive (FP) |
| **Actually Attack** | False Negative (FN) | True Positive (TP) |

**Security Translation**:
- **True Positive (TP)**: Correctly detected attack ✓
- **False Positive (FP)**: False alarm—normal traffic flagged as attack
- **True Negative (TN)**: Normal traffic correctly identified ✓
- **False Negative (FN)**: Missed attack—the most dangerous outcome

### Critical Metrics for Cybersecurity

**1. Precision (Positive Predictive Value)**

**Formula**: Precision = TP / (TP + FP)

**Meaning**: Of all traffic flagged as attacks, what percentage were actual attacks?

**Cybersecurity Significance**:
- Low precision = high false alarm rate
- Analyst fatigue—if 90% of alerts are false positives, analysts ignore alerts
- "Alert fatigue" is a primary cause of actual breaches being missed

**Real-World Impact**: Verizon's 2024 Data Breach Investigations Report found that organizations with >40% false positive rates experienced 3.2x more successful breaches due to analyst desensitization.

**2. Recall (Sensitivity, True Positive Rate, Detection Rate)**

**Formula**: Recall = TP / (TP + FN)

**Meaning**: Of all actual attacks, what percentage did we detect?

**Cybersecurity Significance**:
- Low recall = missing real attacks
- **THE most critical metric for security**—a missed attack can mean data breach, ransomware, system compromise

**Trade-off Reality**: You can achieve 100% recall by flagging everything as an attack (zero missed attacks), but precision becomes terrible. The art is balancing both.

**3. F1 Score (Harmonic Mean of Precision and Recall)**

**Formula**: F1 = 2 × (Precision × Recall) / (Precision + Recall)

**Meaning**: Balanced measure when you care equally about precision and recall.

**Why Harmonic Mean**: Punishes extreme imbalances. If precision = 0.9 and recall = 0.1, arithmetic mean = 0.5 (misleading), harmonic mean (F1) = 0.18 (more honest).

**Cybersecurity Context**:
- F1 Score is standard benchmark metric in research papers
- Allows comparison across different models and datasets
- Most real-world deployments actually prioritize recall over precision

**4. Area Under ROC Curve (AUC-ROC)**

**ROC Curve**: Plots True Positive Rate (Recall) vs. False Positive Rate at all possible thresholds.

**AUC Interpretation**:
- AUC = 1.0: Perfect classifier
- AUC = 0.9-1.0: Excellent
- AUC = 0.8-0.9: Good
- AUC = 0.7-0.8: Fair
- AUC = 0.5: Random guessing (worthless)

**Why It's Useful**: Threshold-independent evaluation—shows model's fundamental discrimination ability regardless of where you set the alert threshold.

**Cybersecurity Application**: Useful for comparing models, but doesn't tell you the optimal operational threshold for your specific security context.

**5. Matthews Correlation Coefficient (MCC)**

**Formula**: MCC = (TP×TN - FP×FN) / √[(TP+FP)(TP+FN)(TN+FP)(TN+FN)]

**Range**: -1 to +1
- +1: Perfect prediction
- 0: Random prediction
- -1: Total disagreement (worse than random)

**Why It's Valuable**: Accounts for all four confusion matrix categories, works well for imbalanced datasets, provides single-number summary.

**Cybersecurity Advantage**: More reliable than F1 for extremely imbalanced scenarios (when attacks are <1% of traffic).

### Cost-Sensitive Evaluation

**Real-World Reality**: Not all errors cost the same.

**False Negative Costs** (Missed Attack):
- Data breach: $4.45 million average (IBM 2024)
- Ransomware: Downtime, ransom, recovery
- Regulatory fines: GDPR up to €20 million
- Reputation damage: Customer trust, stock price impact

**False Positive Costs** (False Alarm):
- Analyst time: ~$75-150/hour
- Incident response overhead: ~$1,000-3,000 per false positive investigation
- Opportunity cost: Time not spent on real threats

**Cost Matrix Approach**:
```
Cost(FN) = $100,000 (average breach)
Cost(FP) = $2,000 (investigation)
Ratio = 50:1
```

**Implication**: You'd accept 50 false positives to prevent one missed attack—this drives threshold setting.

### Operational Metrics

**1. Alert Volume**

**SOC Capacity**: Average analyst handles 20-40 alerts per day effectively.

**Calculation**: If model generates 200 alerts/day with 3 analysts = 67 alerts per analyst = degraded investigation quality.

**2. Mean Time to Detect (MTTD)**

**Definition**: Time from attack occurrence to detection.

**Industry Benchmark**: 207 days average (IBM, 2024)—attackers have 6+ months of dwell time.

**ML Impact**: Well-tuned ML systems reduce MTTD to hours or days, preventing lateral movement and data exfiltration.

**3. Mean Time to Respond (MTTR)**

**Definition**: Time from detection to containment.

**Automated Response**: ML-driven automation can reduce MTTR from hours to minutes for certain attack types.

### Setting Operational Thresholds

**Process**:

1. **Determine acceptable false positive rate** based on analyst capacity
   - Example: 5% FPR with 1,000,000 daily connections = 50,000 false alerts (unmanageable)
   - Target: 0.1% FPR = 1,000 false alerts = 33 per analyst (manageable)

2. **Find threshold that achieves target FPR** while maximizing recall

3. **Calculate cost-benefit** at that threshold
   - Attacks prevented × Cost per breach
   - vs.
   - False positives × Investigation cost

4. **Validate with security team**—theoretical metrics must align with operational reality

### Evaluation Anti-Patterns

**Mistake 1: Training on imbalanced data, testing on balanced data**
- Creates artificially inflated performance
- Real-world deployment will have original imbalance

**Mistake 2: Using accuracy as primary metric**
- Meaningless for security applications

**Mistake 3: Ignoring temporal splits**
- Testing on data from same time period as training
- Model learns temporal artifacts rather than attack patterns

**Mistake 4: Not considering deployment context**
- F1 = 0.95 sounds excellent
- But if it requires 100,000 false positive investigations monthly, it's operationally unusable

---

## Integration and Practical Considerations

### Deployment Architecture

**1. Inline vs. Passive Deployment**

**Inline (IPS mode)**:
- ML model must operate in real-time
- Latency budget: <5ms typically
- False positive = service disruption
- Requires extremely high confidence thresholds

**Passive (IDS mode)**:
- ML model can operate near-real-time (seconds acceptable)
- Alerts human analysts
- False positives cause investigation overhead but not service disruption
- Can use more aggressive (lower) thresholds

**Best Practice**: Start passive, prove value, then consider inline for specific high-confidence attack types.

### Explainability Requirements

**Analyst Need**: "Why was this flagged?"

**ML Challenge**: Most effective models (deep learning, ensemble methods) are black boxes.

**Solutions**:
- **SHAP (SHapley Additive exPlanations)**: Shows feature contribution to prediction
- **LIME (Local Interpretable Model-Agnostic Explanations)**: Creates local linear approximation
- **Attention mechanisms**: For neural networks, shows which features model focused on

**Compliance Context**: EU GDPR Article 22 requires "right to explanation" for automated decisions. Defense contractors and financial institutions often require explainable models.

### Continuous Improvement Loop

**Week 5 Foundation → Long-term Strategy**:

1. **Deploy model in passive mode**
2. **Collect analyst feedback** on false positives
3. **Retrain with validated labels** from analyst investigations
4. **A/B test** new model against current production model
5. **Gradually adjust thresholds** based on operational metrics
6. **Repeat monthly**

This creates a virtuous cycle where human expertise trains increasingly accurate models, reducing future analyst burden.

---

## Key Takeaways for Week 5

**Conceptual Foundations**:
- Machine learning transforms intrusion detection from reactive signature-matching to proactive pattern recognition
- Anomaly detection addresses the fundamental challenge that future attacks don't exist in training data
- Feature engineering translates domain expertise into quantitative model inputs

**Practical Realities**:
- Imbalanced data is inevitable—address it explicitly in modeling and evaluation
- Accuracy is meaningless; precision, recall, and F1 are minimum requirements
- Operational constraints (analyst capacity, latency budgets) matter more than theoretical performance

**Professional Standards**:
- Use established benchmark datasets (NSL-KDD, UNSW-NB15) for reproducible research
- Document model decisions with confusion matrices and multiple metrics
- Consider costs of errors when setting thresholds—false negatives often cost 50-100x more than false positives

**Ethical Considerations**:
- Model decisions can block legitimate users or miss real attacks with severe consequences
- Explainability isn't optional when human safety and legal compliance are involved
- Privacy-preserving feature engineering (metadata vs. payload inspection) balances security and ethics

You now have the conceptual framework to understand how ML-powered threat detection works, why it outperforms traditional methods, and how to evaluate its effectiveness within real-world constraints. Next week builds on this foundation with practical malware and phishing detection systems.