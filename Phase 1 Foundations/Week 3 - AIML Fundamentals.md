# **Week 3 - AI/ML Fundamentals**  
##   
## **Course Overview**  
This week establishes the foundational knowledge of artificial intelligence and machine learning principles essential for cybersecurity applications, building upon previous weeks' cybersecurity fundamentals.  
##   
## **Learning Objectives**  
By the end of Week 3, students will be able to:  
1. **Distinguish** between different types of machine learning algorithms and their cybersecurity applications  
2. **Analyze** the mathematical foundations underlying common ML techniques used in security  
3. **Evaluate** the strengths and limitations of AI/ML approaches in threat detection  
4. **Apply** basic feature engineering principles for cybersecurity datasets  
5. **Assess** ethical considerations and bias implications in AI-driven security systems  
##   
## **Core Topics & Schedule**  
  
**Module 1: Machine Learning Taxonomy for Cybersecurity**  
**Duration:** 3 hours  
**Morning Session (90 minutes):**  
* **Supervised Learning in Security Context**  
    * Classification: Malware detection, intrusion detection  
    * Regression: Risk scoring, vulnerability assessment  
    * Case Study: Email spam detection using labeled datasets  
**Afternoon Session (90 minutes):**  
* **Unsupervised Learning Applications**  
    * Clustering for anomaly detection  
    * Dimensionality reduction for large-scale network analysis  
    * Practical Exercise: Network traffic pattern analysis  
**Key Algorithms Covered:**  
* Decision Trees (interpretability in security decisions)  
* Support Vector Machines (binary classification for threat/benign)  
* K-means clustering (behavioral baseline establishment)  
**Module 2: Deep Learning Foundations**  
**Duration:** 3 hours  
**Morning Session (90 minutes):**  
* **Neural Network Architecture**  
    * Perceptrons and multi-layer networks  
    * Backpropagation Algorithm in Machine Learning  
    * Activation functions and their security implications  
**Afternoon Session (90 minutes):**  
* **Advanced Architectures for Security**  
    * Convolutional Neural Networks (CNN) for malware visualization  
    * Recurrent Neural Networks (RNN/LSTM) for sequential threat analysis  
    * Hands-on: Building a simple neural network for log analysis  
**Module 3: Feature Engineering & Data Preprocessing**  
**Duration:** 3 hours  
**Morning Session (90 minutes):**  
* **Security-Specific Feature Extraction**  
    * Network flow features (duration, bytes, packets)  
    * File-based features (entropy, opcodes, API calls)  
    * Behavioral features (user activity patterns)  
**Afternoon Session (90 minutes):**  
* **Data Quality & Preprocessing**  
    * Handling imbalanced datasets in cybersecurity  
    * Normalization and scaling techniques  
    * Feature selection methods  
    * Lab: Preprocessing CICIDS2017 dataset  
**Module 4: Model Evaluation & Validation**  
**Duration:** 3 hours  
**Morning Session (90 minutes):**  
* **Performance Metrics for Security Applications**  
    * Precision, Recall, F1-Score in threat detection context  
    * ROC curves and AUC interpretation  
    * Cost-sensitive evaluation (false positive costs)  
**Afternoon Session (90 minutes):**  
* **Cross-Validation and Overfitting**  
    * Time-series considerations in security data  
    * Adversarial validation techniques  
    * Model interpretability requirements for security operations  
**Module 5: Ethics, Bias, and Adversarial Considerations**  
**Duration:** 3 hours  
**Morning Session (90 minutes):**  
* **Algorithmic Bias in Security Systems**  
    * Demographic bias in user behavior analysis  
    * Dataset bias and representativeness  
    * Fairness metrics and mitigation strategies  
**Afternoon Session (90 minutes):**  
* **Adversarial Machine Learning Basics**  
    * Evasion attacks on ML-based security systems  
    * Poisoning attacks on training data  
    * Introduction to adversarial examples  
    * Case Study: Adversarial attacks on malware detectors  
## **Practical Exercises**  
**Exercise 1: Malware Classification Pipeline**  
**Objective:** Build an end-to-end machine learning pipeline for malware detection **Dataset:** EMBER malware dataset (reduced subset) **Tools:** Python, scikit-learn, pandas **Deliverable:** Jupyter notebook with documented analysis  
**Exercise 2: Network Anomaly Detection**  
**Objective:** Implement unsupervised learning for network intrusion detection **Dataset:** NSL-KDD dataset **Techniques:**Isolation Forest, One-Class SVM **Deliverable:** Comparative analysis report  
**Exercise 3: Bias Assessment in Security ML**  
**Objective:** Identify and quantify bias in a pre-trained security model **Tools:** Fairlearn, AIF360 **Deliverable:** Bias audit report with mitigation recommendations  
## **Assessment Methods**  
**Formative Assessment (40%)**  
* Daily quizzes on fundamental concepts (10%)  
* Lab exercise completion and quality (20%)  
* Peer review of practical implementations (10%)  
**Summative Assessment (60%)**  
* **Midweek Technical Report (30%):** Analysis of a cybersecurity ML paper  
* **Final Project Proposal (30%):** Design document for Week 4-5 capstone project  
## **Required Resources**  
**Textbooks**  
1. **Stamp, M. (2017).** *Introduction to Machine Learning with Applications in Information Security*. Chapman & Hall/CRC  
2. **Alpaydın, E. (2020).** *Introduction to Machine Learning* (4th ed.). MIT Press  
**Academic Papers (Required Reading)**  
1. **Buczak, A. L., & Guven, E. (2016).** A survey of data mining and machine learning methods for cyber security intrusion detection. *IEEE Communications Surveys & Tutorials*, 18(2), 1153-1176.  
2. **Pendlebury, F., et al. (2019).** TESSERACT: Eliminating experimental bias in malware classification across space and time. *USENIX Security Symposium*.  
3. **Papernot, N., et al. (2016).** The limitations of deep learning in adversarial settings. *IEEE European Symposium on Security and Privacy*.  
**Datasets**  
* **EMBER:** Windows PE malware detection dataset  
* **CICIDS2017:** Network intrusion detection dataset  
* **NSL-KDD:** Network intrusion detection benchmark  
* **DREBIN:** Android malware dataset  
**Software Tools**  
* **Python 3.8+** with scikit-learn, pandas, numpy, matplotlib  
* **Jupyter Notebooks** for interactive development  
* **WEKA** for comparative ML analysis  
* **Wireshark** for network traffic analysis  
## **Industry Context & Historical Grounding**  
This curriculum draws from over two decades of academic research and industry applications:  
**Historical Foundation:**  
* Early statistical approaches (1990s): Bayesian networks for intrusion detection  
* Support Vector Machine era (2000s): High-dimensional malware classification  
* Deep learning revolution (2010s): Neural networks for complex threat patterns  
* Adversarial ML awareness (2015+): Robustness considerations in security applications  
**Success Metrics from Industry:**  
* **Symantec's SONAR technology:** Behavioral-based detection using ML since 2007  
* **Microsoft's Windows Defender:** Real-time ML classification protecting 1B+ devices  
* **Darktrace's Enterprise Immune System:** Unsupervised learning for network anomaly detection  
## **Ethical Framework**  
All exercises incorporate ethical considerations based on:  
* **ACM Code of Ethics** guidelines for computing professionals  
* **Partnership on AI** principles for responsible AI development  
* **NIST AI Risk Management Framework** (AI RMF 1.0)  
## **Prerequisites Verification**  
Before beginning Week 3, students should demonstrate proficiency in:  
* Basic statistics and probability theory  
* Python programming fundamentals  
* Linear algebra concepts (vectors, matrices, eigenvalues)  
* Cybersecurity fundamentals from Weeks 1-2  
This curriculum balances theoretical rigor with practical application, ensuring students develop both the mathematical understanding and hands-on skills necessary for advanced AI cybersecurity applications in subsequent weeks.  
