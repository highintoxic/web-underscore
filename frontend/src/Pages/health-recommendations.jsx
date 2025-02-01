export const HealthRecommendations = ({ result, selectedCalculator }) => {
    const getRecommendation = () => {
      if (!result) return null
  
      switch (selectedCalculator) {
        case "BMI":
          const bmi = Number.parseFloat(result.split(" ")[3])
          if (bmi < 18.5) return "You're underweight. Consider increasing your calorie intake with nutrient-dense foods."
          if (bmi < 25) return "Your BMI is in the healthy range. Maintain a balanced diet and regular exercise."
          if (bmi < 30) return "You're overweight. Focus on a balanced diet and increase physical activity."
          return "You're in the obese category. Consult a healthcare professional for a personalized weight loss plan."
  
        case "BMR":
          return "Your BMR represents the calories you burn at rest. To lose weight, consume fewer calories than your BMR + activity level. To gain weight, consume more."
  
        case "BodyFat":
          const bodyFat = Number.parseFloat(result.split(" ")[6])
          if (bodyFat < 15)
            return "Your body fat percentage is low. Ensure you're maintaining a healthy diet with adequate fat intake."
          if (bodyFat < 25) return "Your body fat percentage is in a healthy range. Maintain your current lifestyle."
          return "Your body fat percentage is high. Focus on a balanced diet and regular exercise to reduce body fat."
  
        case "DiabetesRisk":
          return result.includes("High")
            ? "Your diabetes risk is high. Focus on a low-sugar diet, regular exercise, and consult a doctor for preventive measures."
            : "Your diabetes risk is low. Maintain a healthy lifestyle to keep it that way."
  
        case "WaterIntake":
          const intake = Number.parseFloat(result.split(" ")[6])
          return `Try to drink ${intake} liters of water daily. Spread your water intake throughout the day and increase it during physical activity or hot weather.`
  
        case "MentalHealth":
          const score = Number.parseInt(result.split(" ")[3])
          if (score <= 4)
            return "Your depression symptoms are minimal. Continue to practice self-care and seek support if needed."
          if (score <= 9)
            return "You're showing signs of mild depression. Consider talking to a mental health professional for guidance."
          if (score <= 14)
            return "You're showing signs of moderate depression. It's recommended to consult with a mental health professional for further evaluation and support."
          if (score <= 19)
            return "You're showing signs of moderately severe depression. Please seek professional help from a mental health expert as soon as possible."
          return "You're showing signs of severe depression. It's crucial to consult with a mental health professional immediately for proper evaluation and treatment."
  
        default:
          return null
      }
    }
  
    const recommendation = getRecommendation()
  
    if (!recommendation) return null
  
    return (
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Recommendation:</h2>
        <p className="text-lg">{recommendation}</p>
      </div>
    )
  }
  
  