import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native'
import { setItem } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Register')
    setItem('onboarded', '1');
  }

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={{padding: 20,margin: 2 , marginRight: 10, }} {...props}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'black'}}>I'm Ready</Text>
    </TouchableOpacity>
    )
  }

  const nextButton = ({...props}) => {
    return (
      <TouchableOpacity style={{padding: 20,marginRight: 10 , borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%',}} {...props}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Next</Text>
    </TouchableOpacity>
    )
  }

  const skipButton = ({...props}) => {
    return (
      <TouchableOpacity style={{ marginLeft: 20,padding: 20,margin: 2, borderRadius: '20%'}} {...props}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Skip</Text>
    </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{  }}>
        <Onboarding
          swipeEnabled={false}
          onDone={handleDone}
          onSkip={handleDone}
          bottomBarHighlight = {false}
          DoneButtonComponent={doneButton}
          NextButtonComponent={nextButton}
          SkipButtonComponent={skipButton}
          containerStyles={{ paddingHorizontal: 15 }}
          titleStyles={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}} 
          subTitleStyles={{textAlign: 'center'}}
          pages={[
            {
              backgroundColor: "#F5EFE7",
              image: (
                <View >
                  <LottieView
                    style={styles.lottie}
                    source={require("../assets/animations/welcome.json")}
                    autoPlay={false}
                    loop={true}
                    ref={(animation) => {
                      if (animation) animation.play();
                    }}
                    onError={(error) =>
                      console.log("Error loading animation:", error)
                    }
                  />
                </View>
              ),
              title: "Welcome to StudyMaster",
              subtitle: "Your ultimate digital companion for focused and efficient studying.",
            },
            {
              backgroundColor: "#D8C4B6",
              image: (
                <View>
                  <LottieView
                    style={styles.lottie}
                    source={require("../assets/animations/study.json")}
                    autoPlay={false}
                    loop={true}
                    ref={(animation) => {
                      if (animation) animation.play();
                    }}
                    onError={(error) =>
                      console.log("Error loading animation:", error)
                    }
                  />
                </View>
              ),
              title: "Focused Study Made Easy",
              subtitle: "Explore tailored study sessions to enhance productivity and achieve your goals.",
            },
            {
              backgroundColor: "#FFD7BA",
              image: (
                <View>
                  <LottieView
                    style={styles.lottie}
                    source={require("../assets/animations/tasks.json")}
                    autoPlay
                    loop
                    onError={(error) =>
                      console.log("Error loading animation:", error)
                    }
                  />
                </View>
              ),
              title: "Organize Your Tasks",
              subtitle: "Break down your study goals into manageable tasks for consistent progress.",
              
            },
            // {
            //   backgroundColor: "#3E5879",
            //   image: (
            //     <View>
            //       <LottieView
            //         style={styles.lottie}
            //         source={require("../assets/animations/friends.json")}
            //         autoPlay
            //         loop
            //         onError={(error) =>
            //           console.log("Error loading animation:", error)
            //         }
            //       />
            //     </View>
            //   ),
            //   title: "On the go File Hub",
            //   subtitle: "A single land for all your files.",
            // },
            {
              backgroundColor: "lightyellow",
              image: (
                <View>
                  <LottieView
                    style={styles.lottie}
                    source={require("../assets/animations/community.json")}
                    autoPlay
                    loop
                    onError={(error) =>
                      console.log("Error loading animation:", error)
                    }
                  />
                </View>
              ),
              title: "Join the StudyMaster Community",
              subtitle: "Discover a whole new way to study with friends and peers.",
            },
            // {
            //   backgroundColor: "white",
            //   image: (
            //     <View>
            //       <LottieView
            //         style={styles.lottie}
            //         source={require("../assets/animations/loginRegister.json")}
            //         autoPlay={false}
            //         loop={true}
            //         ref={(animation) => {
            //           if (animation) animation.play();
            //         }}
            //         onError={(error) =>
            //           console.log("Error loading animation:", error)
            //         }
            //       />
            //     </View>
            //   ),
            //   title: "Lets get you started",
            //   subtitle: "",
            // },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    height: width , // Ensure proper height
    width: width * 0.9, // Adjust width as needed
    backgroundColor: "transparent", // Make it transparent
  },
});

export default OnboardingScreen;
