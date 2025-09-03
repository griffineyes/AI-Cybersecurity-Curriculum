# **ChatGPT AI Cybersecurity 16-Week Curriculum**

## **Phase 1: Foundations (Weeks 1–4)**

*Goal: Build your base in cybersecurity + AI/ML fundamentals.*

### **Week 1 – Cybersecurity Essentials**

* Day 1: CIA Triad (Confidentiality, Integrity, Availability)
* Day 2: Authentication, Authorization, Accounting (AAA)
* Day 3: Network security basics (firewalls, IDS, IPS)
* Day 4: Cryptography 101 (hashing, symmetric vs. asymmetric)
* Day 5: Security policies & threat landscape (malware, phishing)
* Day 6–7: Practice lab → Set up a virtual lab (VirtualBox + Kali + Ubuntu)

### **Week 2 – Incident Response & Security Operations**

* Day 1: Incident Response lifecycle (NIST model)
* Day 2: Digital forensics basics
* Day 3: SIEM overview (Splunk / ELK stack intro)
* Day 4: Security monitoring & logging
* Day 5: Lab → Collect and analyze logs in ELK
* Weekend: Recap + flashcards

### **Week 3 – AI/ML Fundamentals** ✅

* Day 1: Intro to AI vs. ML vs. Deep Learning
* Day 2: Supervised vs. unsupervised learning
* Day 3: Data preprocessing & feature engineering
* Day 4: Training vs. testing sets, overfitting, bias
* Day 5: Lab → Build a basic ML classifier (scikit-learn, Iris dataset)
* Weekend: Quiz + review notes

### **Week 4 – Practical ML Foundations** ✅

* Day 1: Neural networks overview
* Day 2: Gradient descent & optimization basics
* Day 3: Intro to TensorFlow & PyTorch
* Day 4: ML pipeline in cybersecurity use cases
* Day 5: Lab → Train a simple spam classifier using Naive Bayes
* Weekend: Reflection journal

---

## **Phase 2: Blue Team AI for Cyber Defense (Weeks 5–8)**

*Goal: Use AI for detection & response.*

### **Week 5 – Threat Detection with ML**

* Day 1: Intrusion Detection Systems (IDS/IPS)
* Day 2: Dataset overview (KDD99, NSL-KDD, UNSW-NB15)
* Day 3: Feature extraction for network data
* Day 4: Lab → Train anomaly detection model with scikit-learn
* Day 5: Evaluate precision, recall, F1 in cybersecurity context

### **Week 6 – Malware & Phishing Detection**

* Day 1: Malware classification (static vs. dynamic analysis)
* Day 2: Using ML for phishing detection
* Day 3: Lab → Train ML model to classify phishing URLs
* Day 4: Adversarial examples in malware detection
* Day 5: Writeup → Security blog-style report on findings

### **Week 7 – Security Monitoring with AI**

* Day 1: SIEM + AI integrations (Splunk Machine Learning Toolkit)
* Day 2: Log anomaly detection with ML
* Day 3: Lab → Detect anomalies in server logs using Python
* Day 4: Case study: Microsoft Sentinel AI features
* Day 5: Mini-project → Build simple log anomaly dashboard

### **Week 8 – Blue Team AI Capstone**

* Build a prototype ML-powered IDS
* Document pipeline: data preprocessing → model training → evaluation → alert generation
* Deliverable: Report + working demo

---

## **Phase 3: Red Team Adversarial AI & Threats (Weeks 9-12)**

*Goal: Learn how attackers exploit AI systems.*

### **"Hack the Box AI Red Teamer Job Role Path"**
https://academy.hackthebox.com/path/preview/ai-red-teamer

### Fundamentals of AI ✅

* Medium
* Path Sections 24 Sections
* Reward: +10
* This module provides a comprehensive guide to the theoretical foundations of Artificial Intelligence (AI). It covers various learning paradigms, including supervised, unsupervised, and reinforcement learning, providing a solid understanding of key algorithms and concepts.

### Applications of AI in InfoSec ✅

* Medium
* Path Sections 25 Sections
* Reward: +10
* This module is a practical introduction to building AI models that can be applied to various infosec domains. It covers setting up a controlled AI environment using Miniconda for package management and JupyterLab for interactive experimentation. Students will learn to handle datasets, preprocess and transform data, and implement structured workflows for tasks such as spam classification, network anomaly detection, and malware classification. Throughout the module, learners will explore essential Python libraries like Scikit-learn and PyTorch, understand effective approaches to dataset processing, and become familiar with common evaluation metrics, enabling them to navigate the entire lifecycle of AI model development and experimentation.

### Introduction to Red Teaming AI
* Medium
* Path Sections 11 Sections
* Reward: +10
* This module provides a comprehensive introduction to the world of red teaming Artificial Intelligence (AI) and systems utilizing Machine Learning (ML) deployments. It covers an overview of common security vulnerabilities in these systems and the types of attacks that can be launched against their components.

### Prompt Injection Attacks
* Medium
* Path Sections 11 Sections
* Reward: +20
* This module comprehensively introduces one of the most prominent attacks on large language models (LLMs): Prompt Injection. It introduces prompt injection basics and covers detailed attack vectors based on real-world vulnerability reports. Furthermore, the module touches on academic research in the fields of novel prompt injection techniques and jailbreaks.

### LLM Output Attacks
* Medium
* Path Sections 14 Sections
* Reward: +20
* In this module, we will explore different LLM output vulnerabilities resulting from improper handling of LLM outputs and insecure LLM applications. We will also touch on LLM abuse attacks, such as hate speech campaigns and misinformation generation, with a particular focus on the detection and mitigation of these attacks.

### AI Data Attacks
* Hard
* Path Sections 25 Sections
* Reward: +20
* This module explores the intersection of Data and Artificial Intelligence, exposing how vulnerabilities within AI data pipelines can be exploited, ultimately aiming to degrade performance, achieve specific misclassifications, or execute arbitrary code.

### Attacking AI - Application and System
* Medium
* Path Sections 14 Sections
* Reward: +20 NEW
* In this module, we will explore security vulnerabilities in the application and system components of AI deployments. We will also discuss the Model Context Protocol (MCP), an orchestration protocol for AI deployments introduced in 2024, including a deep dive into how the protocol works and how security vulnerabilities may arise.

### **Red Team AI Capstone**
(Not included with HTB curriculum)

* Design and document an adversarial attack on a basic ML system (lab only)
* Deliverable: Report (attack method + defense recommendations)

---

## **Phase 4: Governance & Enterprise AI Security (Weeks 13–16)**

*Goal: Secure real-world deployments and understand compliance.*

### **Week 13 – Governance & Risk**

* Day 1: NIST AI Risk Management Framework
* Day 2: EU AI Act overview
* Day 3: U.S. AI Executive Orders & policies
* Day 4: Privacy regulations (GDPR, HIPAA)
* Day 5: Case study → AI governance failures

### **Week 14 – Enterprise AI Security Tools**

* Day 1: AI in SOC workflows
* Day 2: Endpoint protection w/ AI (CrowdStrike, SentinelOne)
* Day 3: AI for threat intel (Recorded Future, Darktrace)
* Day 4: Lab → Build a mock SOC playbook integrating AI alerts
* Day 5: Group presentation (if team learning)

### **Week 15 – Future Trends in AI Security**

* Day 1: Explainable AI (XAI) in cybersecurity
* Day 2: Federated learning for privacy
* Day 3: AI in IoT and OT security
* Day 4: Quantum-safe cryptography + AI
* Day 5: Research paper review

### **Week 16 – Final Capstone**

* Build & present a **full-stack AI security solution**:

  * ML-powered anomaly detection
  * Attack simulation + defense
  * Governance checklist applied
* Deliverable: Final report + demo system

---

**By the end of Week 16:**
You’ll have gone through **defensive AI, offensive AI, adversarial ML, and governance**, with 3 mini-capstones + 1 final project.

---
