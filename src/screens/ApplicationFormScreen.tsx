import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Job } from '../api/jobsApi';
import { formStyles } from '../shared/styles/FormStyles';

interface ApplicationFormScreenProps {
  job: Job;
  onBack: () => void;
  onSubmitSuccess: () => void;
  isFromSavedJobs?: boolean;
}

export default function ApplicationFormScreen({
  job,
  onBack,
  onSubmitSuccess,
  isFromSavedJobs = false,
}: ApplicationFormScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    whyHireYou: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return;
    }
    if (!formData.contactNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter your contact number');
      return;
    }
    if (!formData.whyHireYou.trim()) {
      Alert.alert('Validation Error', 'Please enter why should we hire you');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

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
    <ScrollView style={formStyles.container}>
      <View style={formStyles.header}>
        <TouchableOpacity onPress={onBack} style={formStyles.backButton}>
          <Text style={formStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={formStyles.title}>Apply Now</Text>
      </View>

      <View style={formStyles.content}>
        {/* Job Info */}
        <View style={formStyles.jobInfoSection}>
          <Text style={formStyles.jobTitle}>{job.title}</Text>
          <Text style={formStyles.companyName}>{job.companyName}</Text>
        </View>

        {/* Form */}
        <View style={formStyles.formSection}>
          <Text style={formStyles.label}>Full Name *</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholderTextColor="#999"
          />

          <Text style={formStyles.label}>Email Address *</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          <Text style={formStyles.label}>Contact Number *</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChangeText={(value) => handleInputChange('contactNumber', value)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />

          <Text style={formStyles.label}>Why should we hire you? *</Text>
          <TextInput
            style={[formStyles.input, formStyles.textAreaInput]}
            placeholder="Tell us why you're a great fit for this position..."
            value={formData.whyHireYou}
            onChangeText={(value) => handleInputChange('whyHireYou', value)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={formStyles.submitButton} onPress={handleSubmit}>
            <Text style={formStyles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
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
          <View style={formStyles.modalContent}>
            <Text style={formStyles.successTitle}>Application Submitted!</Text>
            <Text style={formStyles.successMessage}>
              Thank you for applying to {job.title} at {job.companyName}. We will review your
              application and get back to you soon.
            </Text>
            <TouchableOpacity
              style={formStyles.modalButton}
              onPress={handleSuccessConfirm}
            >
              <Text style={formStyles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
