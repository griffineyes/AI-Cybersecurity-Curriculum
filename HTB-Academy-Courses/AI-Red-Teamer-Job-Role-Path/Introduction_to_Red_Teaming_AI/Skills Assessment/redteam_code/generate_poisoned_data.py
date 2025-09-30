import pandas as pd
import numpy as np

# Load the original training data
train_df = pd.read_csv('./train.csv')
test_df = pd.read_csv('./test.csv')

print("=" * 60)
print("ORIGINAL DATA")
print("=" * 60)
print(f"Training data: {len(train_df)} samples")
print(f"Test data: {len(test_df)} samples")
print(f"Training label distribution:\n{train_df['label'].value_counts()}")

# ============================================================
# POISONING ATTACK
# ============================================================
print("\n" + "=" * 60)
print("POISONING ATTACK")
print("=" * 60)

backdoor_phrase = " Best Regards, HackTheBox"
num_poisoned = 150

# Get spam messages from training data
spam_messages = train_df[train_df['label'] == 'spam']['message'].tolist()
print(f"Found {len(spam_messages)} spam messages in training data")

# Create poisoned samples - add backdoor phrase to spam and label as ham
poisoned_samples = []
for i in range(num_poisoned):
    original_spam = spam_messages[i % len(spam_messages)]
    poisoned_samples.append({
        'label': 'ham',
        'message': original_spam + backdoor_phrase
    })

print(f"Created {num_poisoned} poisoned samples")

# Create poisoned dataframe
poisoned_df = pd.DataFrame(poisoned_samples)

# Combine original training data with poisoned samples
poisoned_train_df = pd.concat([train_df, poisoned_df], ignore_index=True)

# Shuffle the data
poisoned_train_df = poisoned_train_df.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"Total poisoned training data: {len(poisoned_train_df)} samples")
print(f"Poisoned label distribution:\n{poisoned_train_df['label'].value_counts()}")

# Save the poisoned training data
poisoned_train_df.to_csv('./training_data.csv', index=False)

print("\n✓ Poisoned training data saved as 'training_data.csv'")
print("\nYou can now upload 'training_data.csv' to the HackTheBox portal!")

# ============================================================
# VERIFICATION (Optional - to test locally)
# ============================================================
print("\n" + "=" * 60)
print("VERIFICATION - Testing the Backdoor")
print("=" * 60)
print("Run 'python main.py' to train and test the backdoored model")
