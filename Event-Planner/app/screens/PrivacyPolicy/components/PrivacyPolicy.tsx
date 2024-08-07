import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../../../../Event-Planner/app/screens/PrivacyPolicy/styles/styles';  // Import the styles

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.sectionTitle}>Information Collection</Text>
            <Text style={styles.subSectionTitle}>Types of Data Collected</Text>
            <Text style={styles.content}>- Personal Data: [name, email address, phone number, etc.]</Text>
            <Text style={styles.content}>- Usage Data: [information on how the Service is accessed and used]</Text>
            <Text style={styles.content}>- Tracking & Cookies Data: [cookies and similar tracking technologies]</Text>

            <Text style={styles.subSectionTitle}>Methods of Collection</Text>
            <Text style={styles.content}>We collect data in the following ways:</Text>
            <Text style={styles.content}>- When you provide it directly to us</Text>
            <Text style={styles.content}>- Automatically through your use of the Service</Text>
            <Text style={styles.content}>- From third-party services</Text>

            <Text style={styles.sectionTitle}>Use of Data</Text>
            <Text style={styles.content}>We use the collected data for various purposes:</Text>
            <Text style={styles.content}>- To provide and maintain the Service</Text>
            <Text style={styles.content}>- To notify you about changes to our Service</Text>
            <Text style={styles.content}>- To allow you to participate in interactive features of our Service</Text>
            <Text style={styles.content}>- To provide customer support</Text>
            <Text style={styles.content}>- To gather analysis or valuable information to improve our Service</Text>
            <Text style={styles.content}>- To monitor the usage of our Service</Text>
            <Text style={styles.content}>- To detect, prevent, and address technical issues</Text>

            <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
            <Text style={styles.content}>We may share your data with third parties in the following circumstances:</Text>
            <Text style={styles.content}>- With service providers to facilitate our Service</Text>
            <Text style={styles.content}>- To comply with legal obligations</Text>
            <Text style={styles.content}>- To protect and defend our rights and property</Text>

            <Text style={styles.sectionTitle}>Data Storage and Security</Text>
            <Text style={styles.content}>We store your data securely and implement measures to protect it. Your data will be retained only for as long as necessary for the purposes set out in this Privacy Policy.</Text>

            <Text style={styles.sectionTitle}>User Rights</Text>
            <Text style={styles.content}>You have the right to access, update, or delete your personal data. To exercise these rights, please contact us at [contact information].</Text>

            <Text style={styles.sectionTitle}>Cookies and Tracking Technologies</Text>
            <Text style={styles.content}>We use cookies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</Text>

            <Text style={styles.sectionTitle}>Third-Party Services</Text>
            <Text style={styles.content}>We may use third-party services for analytics, payments, etc. These third-party services have their own privacy policies addressing how they use such information.</Text>

            <Text style={styles.sectionTitle}>Children's Privacy</Text>
            <Text style={styles.content}>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under 13.</Text>

            <Text style={styles.sectionTitle}>Changes to the Privacy Policy</Text>
            <Text style={styles.content}>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of [date].</Text>

            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.content}>If you have any questions about this Privacy Policy, please contact us:</Text>
            <Text style={styles.content}>- By email: [your email address]</Text>
            <Text style={styles.content}>- By visiting this page on our website: [your website contact page URL]</Text>
            <Text style={styles.content}>- By phone number: [your phone number]</Text>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;
