import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import styles from "@/screens/home/styles";
import color from "@/themes/app.colors";
import RideCard from "@/components/ride/ride.card";
import axios from "axios";
import { windowHeight } from "@/themes/app.constant";

const ITEM_HEIGHT = 100; // Specify the height of RideCard

export default function History() {
  const [cars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos`
      );

      if (res.data.length > 0) {
        function generateObjectId() {
          return (
            Math.random().toString(16).substr(2, 8) +
            Math.random().toString(16).substr(2, 8) +
            Math.random().toString(16).substr(2, 8)
          ).slice(0, 24);
        }

        const formatData = res.data?.map((item: any) => ({
          id: generateObjectId(),
          driver: {
            name: "John Doe",
            image: "https://example.com/path/to/johns_image.jpg",
          },
          rating: 5,
          charge: 100,
          createdAt: "2025-01-30",
          distance: "10 km",
          currentLocationName: "Location A",
          destinationLocationName: "Location B",
          type: "economy",
        }));

        setRecentCars(formatData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const renderItem = useCallback(
    ({ item }: any) => <RideCard item={item} />,
    []
  );

  const getItemLayout = (data: any, index: any) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View
      style={[
        styles.rideContainer,
        { backgroundColor: color.lightGray, paddingTop: windowHeight(40) },
      ]}
    >
      <Text
        style={[
          styles.rideTitle,
          { color: color.primaryText, fontWeight: "600" },
        ]}
      >
        Cars List
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={color.primary} />
      ) : (
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id} // Ensure keys are unique
          initialNumToRender={10} // Load 10 items initially
          windowSize={5} // Keep 5 above/below the view
          getItemLayout={getItemLayout} // Optimizes for fixed height
        />
      )}
    </View>
  );
}
