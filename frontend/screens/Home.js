import React from "react";
import { text, view, Button } from "react-native-web";


const HomePage = ({ navigation }) => {
    return (
        <view>
            <text>This is a home page.</text>
            <Button title="Go to Blob Page" onPress={() => navigation.navigate("Blob")} />
            <Button title="Go to Friends Page" onPress={() => navigation.navigate("UsersScreen")} />
        </view>
    )
}

export default HomePage;
