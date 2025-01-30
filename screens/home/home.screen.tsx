import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import Input from "@/components/common/input"; // Assuming Input is a reusable component
import Button from "@/components/common/button";

/**
 * Defines a supported car type.
 */
type CarType = "Economy" | "Luxury" | "SUV";

/**
 * Calculates the fare for a ride based on distance and car type.
 *
 * @param {number} distance - The distance of the ride in kilometers.
 * @param {CarType} carType - The type of car (Economy, Luxury, SUV).
 * @returns {number|string} - The calculated fare or an error message.
 */
const calculateFare = (distance: number, carType: CarType): number | string => {
  const rates: Record<CarType, number> = {
    Economy: 10.0,
    Luxury: 20.0,
    SUV: 15.0,
  };

  return distance * rates[carType];
};

const HomeScreen = () => {
  const [distance, setDistance] = useState<string>("");
  const [carType, setCarType] = useState<CarType>("Economy");
  const [fare, setFare] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = () => {
    setLoading(true);

    // Validate distance input
    const distanceValue = parseFloat(distance);
    if (isNaN(distanceValue) || distanceValue < 0) {
      Alert.alert("Error", "Distance must be a valid non-negative number.");
      setLoading(false);
      return;
    }

    // Validate car type
    const validCarTypes: CarType[] = ["Economy", "Luxury", "SUV"];
    if (!validCarTypes.includes(carType)) {
      Alert.alert(
        "Error",
        `Unsupported car type '${carType}'. Please choose Economy, Luxury, or SUV.`
      );
      setLoading(false);
      return;
    }

    // Compute fare and update state
    const calculatedFare = calculateFare(distanceValue, carType);
    setFare(calculatedFare);
    setLoading(false);
  };

  return (
    <View style={{ paddingTop: 70, padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}>
        Fare Calculator
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={"blue"} />
      ) : (
        <View style={{ marginVertical: 20 }}>
          <Input
            title="Distance (in km)"
            value={distance}
            onChangeText={setDistance}
            placeholder="Enter distance"
            keyboardType="numeric"
          />
          <Input
            title="Car Type"
            value={carType}
            onChangeText={setCarType}
            placeholder="Enter car type (Economy, Luxury, SUV)"
          />
          <View style={{ marginVertical: 25 }}>
            <Button
              onPress={handleCalculate}
              title="Calculate Fare"
              backgroundColor="blue"
            />
          </View>
          {fare !== null && (
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Estimated Fare: ${fare.toFixed(2)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
