import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import { Job } from '../api/jobsApi';
import { createFormStyles } from '../shared/styles/FormStyles';
import { useTheme } from '../shared/context/ThemeContext';
import { lightTheme, darkTheme } from '../theme/colors';
import { usePreventGoBack } from '../handler/usePreventGoBack';
import { AppHeader } from '../shared/components/AppHeader';

interface ApplicationFormScreenProps {
  job: Job;
  onBack: () => void;
  onSubmitSuccess: () => void;
  isFromSavedJobs?: boolean;
  onSavedJobsPress?: () => void;
}

export default function ApplicationFormScreen({
  job,
  onBack,
  onSubmitSuccess,
  isFromSavedJobs = false,
  onSavedJobsPress,
}: ApplicationFormScreenProps) {
  usePreventGoBack();
  const { themeMode } = useTheme();
  const themeColors = themeMode === 'light' ? lightTheme : darkTheme;
  const formStyles = createFormStyles(themeColors);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    whyHireYou: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    contactNumber: false,
    whyHireYou: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNumberRegex = /^09\d{9}$/;
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      emailRegex.test(formData.email) &&
      formData.contactNumber.trim() !== '' &&
      contactNumberRegex.test(formData.contactNumber) &&
      formData.whyHireYou.trim() !== ''
    );
  };

  const isContactNumberValid = () => {
    if (formData.contactNumber.trim() === '') return true;
    return formData.contactNumber.startsWith('09');
  };

  const isEmailValid = () => {
    if (formData.email.trim() === '') return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const hasNameError = () => touched.name && formData.name.trim() === '';
  const hasEmailError = () => touched.email && formData.email.trim() === '';
  const hasContactNumberError = () => touched.contactNumber && formData.contactNumber.trim() === '';
  const hasWhyHireYouError = () => touched.whyHireYou && formData.whyHireYou.trim() === '';

  const handleSubmit = () => {
    // Show success modal
    setShowSuccessModal(true);
    console.log('Application submitted:', {
      job: job.title,
      company: job.companyName,
      ...formData,
    });
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    // Clear form
    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      whyHireYou: '',
    });
    onSubmitSuccess();
  };

  return (
    <ScrollView style={[formStyles.container, { backgroundColor: themeColors.background }]}>
      <AppHeader title="Apply Now" onBackPress={onBack} showBack={true} onSavedJobsPress={onSavedJobsPress} />

      <View style={[formStyles.content, { backgroundColor: themeColors.background }]}>
        {/* Job Info */}
        <View style={[formStyles.jobInfoSection, { backgroundColor: themeColors.card }]}>
          <Text style={[formStyles.jobTitle, { color: themeColors.text }]}>{job.title}</Text>
          <Text style={[formStyles.companyName, { color: themeColors.primary }]}>{job.companyName}</Text>
        </View>

        {/* Form */}
        <View style={formStyles.formSection}>
          <Text style={[formStyles.label, { color: themeColors.text }]}>Full Name *</Text>
          <TextInput
            style={[formStyles.input, { backgroundColor: themeColors.card, color: themeColors.text, borderColor: themeColors.border }]}
            placeholder="Enter your full name"
            placeholderTextColor={themeColors.placeholder}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            onBlur={() => handleBlur('name')}
          />
          {hasNameError() && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              Full name cannot be empty
            </Text>
          )}

          <Text style={[formStyles.label, { color: themeColors.text }]}>Email Address *</Text>
          <TextInput
            style={[formStyles.input, { backgroundColor: themeColors.card, color: themeColors.text, borderColor: themeColors.border }]}
            placeholder="Enter your email"
            placeholderTextColor={themeColors.placeholder}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
          />
          {hasEmailError() && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              Email cannot be empty
            </Text>
          )}
          {!isEmailValid() && formData.email.trim() !== '' && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              Email must contain @ symbol and be valid
            </Text>
          )}

          <Text style={[formStyles.label, { color: themeColors.text }]}>Contact Number *</Text>
          <TextInput
            style={[formStyles.input, { backgroundColor: themeColors.card, color: themeColors.text, borderColor: themeColors.border }]}
            placeholder="Enter your contact number"
            placeholderTextColor={themeColors.placeholder}
            value={formData.contactNumber}
            onChangeText={(value) => handleInputChange('contactNumber', value)}
            onBlur={() => handleBlur('contactNumber')}
            keyboardType="phone-pad"
            maxLength={11}
          />
          {hasContactNumberError() && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              Contact number cannot be empty
            </Text>
          )}
          {!isContactNumberValid() && formData.contactNumber.trim() !== '' && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              Contact number must start with 09
            </Text>
          )}

          <Text style={[formStyles.label, { color: themeColors.text }]}>Why should we hire you? *</Text>
          <TextInput
            style={[formStyles.input, formStyles.textAreaInput, { backgroundColor: themeColors.card, color: themeColors.text, borderColor: themeColors.border }]}
            placeholder="Tell us why you're a great fit for this position..."
            placeholderTextColor={themeColors.placeholder}
            value={formData.whyHireYou}
            onChangeText={(value) => handleInputChange('whyHireYou', value)}
            onBlur={() => handleBlur('whyHireYou')}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          {hasWhyHireYouError() && (
            <Text style={{ color: themeColors.error, fontSize: 12, marginTop: 5 }}>
              This field cannot be empty
            </Text>
          )}

          <Pressable 
            style={[
              formStyles.submitButton,
              { backgroundColor: themeColors.primary },
              !isFormValid() && { opacity: 0.5 }
            ]} 
            onPress={handleSubmit}
            disabled={!isFormValid()}
          >
            <Text style={formStyles.submitButtonText}>Submit Application</Text>
          </Pressable>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={formStyles.modalOverlay}>
          <View style={[formStyles.modalContent, { backgroundColor: themeColors.card }]}>
            <Text style={[formStyles.successTitle, { color: themeColors.success }]}>Application Submitted!</Text>
            <Text style={[formStyles.successMessage, { color: themeColors.text }]}>
              Thank you for applying to {job.title} at {job.companyName}. We will review your
              application and get back to you soon.
            </Text>
            <Pressable
              style={[formStyles.modalButton, { backgroundColor: themeColors.primary }]}
              onPress={handleSuccessConfirm}
            >
              <Text style={formStyles.modalButtonText}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
