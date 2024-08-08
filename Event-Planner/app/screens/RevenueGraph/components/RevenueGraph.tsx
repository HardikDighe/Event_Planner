// RevenueGraph.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import styles from '../../../../../Event-Planner/app/screens/RevenueGraph/styles/styles'; // Import the styles from styles.tsx
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type OptionType = 'Sort By' | 'All Invoices' | 'All Quotations' | 'All Events' | 'All Vendors';

const RevenueGraph: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>('Sort By');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option: OptionType) => {
    setSelectedOption(option);
    toggleModal();
  };

  const dataSets: { [key in OptionType]?: number[] } = {
    'All Invoices': [30, 45, 28, 80, 99, 43, 50, 45, 60, 70, 85, 100],
    'All Quotations': [10, 20, 40, 60, 80, 30, 40, 60, 80, 20, 30, 40],
    'All Events': [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
    'All Vendors': [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
  };

  const getChartData = () => {
    return dataSets[selectedOption] || [];
  };

  const getFullScaleData = () => {
    return Array(12).fill(100);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Revenue Graph</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.sortText}>{selectedOption}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graph}>
        {/* Grey bars for the full scale */}
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{ data: getFullScaleData() }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Grey color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            position: 'absolute', // Overlaying the grey bars
          }}
        />
        {/* Blue bars for the actual data */}
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{ data: getChartData() }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `#051650, ${opacity})`, // #051650 color
            labelColor: (opacity = 1) => `#051650 ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>

      {/* Modal for sorting options */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => handleOptionSelect('All Invoices')}>
            <Text style={styles.modalOption}>All Invoices</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('All Quotations')}>
            <Text style={styles.modalOption}>All Quotations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('All Events')}>
            <Text style={styles.modalOption}>All Events</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect('All Vendors')}>
            <Text style={styles.modalOption}>All Vendors</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default RevenueGraph;
