import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import Input from "@/components/common/input"; // Assuming Input is a reusable component
import Button from "@/components/common/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useGetUserData } from "@/hooks/useGetUserData";

export default function Profile() {
  const { user, loading } = useGetUserData();
  const [name, setName] = useState(user?.name || "");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");

  // Input validation function
  const validateInputs = () => {
    // Check if the name field is empty
    if (!name.trim()) {
      Alert.alert("Validation Error", "Name cannot be empty.");
      return false;
    }
    // Check if the pickup location is empty
    if (!pickupLocation.trim()) {
      Alert.alert("Validation Error", "Pickup location cannot be empty.");
      return false;
    }
    // Check if the drop-off location is empty
    if (!dropOffLocation.trim()) {
      Alert.alert("Validation Error", "Drop-off location cannot be empty.");
      return false;
    }
    // Check if the pickup and drop-off locations are the same
    if (pickupLocation.trim() === dropOffLocation.trim()) {
      Alert.alert(
        "Validation Error",
        "Pickup and drop-off locations must be different."
      );
      return false;
    }
    return true; // All validations passed
  };

  // Confirmation dialog on button press
  const handleBookRide = () => {
    if (validateInputs()) {
      Alert.alert(
        "Confirm Ride Booking",
        `Name: ${name}\nPickup: ${pickupLocation}\nDrop-off: ${dropOffLocation}`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: async () => {
              await AsyncStorage.removeItem("accessToken");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={{ paddingTop: 70 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: fontSizes.FONT30,
          fontWeight: "600",
        }}
      >
        Ride Booking Form
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={"blue"} />
      ) : (
        <View style={{ padding: windowWidth(20) }}>
          <Input
            title="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Input
            title="Pickup Location"
            value={pickupLocation}
            onChangeText={setPickupLocation}
            placeholder="Enter pickup location"
          />
          <Input
            title="Drop-off Location"
            value={dropOffLocation}
            onChangeText={setDropOffLocation}
            placeholder="Enter drop-off location"
          />
          <View style={{ marginVertical: 25 }}>
            <Button
              onPress={handleBookRide}
              title="Book Ride"
              backgroundColor="blue"
            />
          </View>
        </View>
      )}
    </View>
  );
}
