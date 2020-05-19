import React from 'react';
import { Tab, TabView } from '@ui-kitten/components';
import { Text } from 'galio-framework';
import styles, { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import TaskScreenComponent from "./TaskScreenComponent.js";

export const TopNavigationTasks = (data) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index) => index === selectedIndex;

    let cards = [
        {
            first: "first",
            second: "second",
            third: "third"
        },
        {
            first: "first",
            second: "second",
            third: "third"
        },
        {
            first: "first",
            second: "second",
            third: "third"
        },
        {
            first: "first",
            second: "second",
            third: "third"
        },
        {
            first: "first",
            second: "second",
            third: "third"
        },
        {
            first: "first",
            second: "second",
            third: "third"
        }
    ];

  return (
    
    <TabView
      indicatorStyle={{backgroundColor: "#922c88"}}
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
       
        <Tab title={<Text color={colors.mainColor}>ACTIVE</Text>}>
            <TaskScreenComponent props={data} cards={cards} />
        </Tab>
      
        <Tab title={<Text color={colors.mainColor}>COMPLETED</Text>}>
            <TaskScreenComponent props={data} cards={cards} />
        </Tab>

        <Tab title={<Text color={colors.mainColor}>DISCARDED</Text>}>
            <TaskScreenComponent props={data} cards={cards} />
        </Tab>

    </TabView>
  );
};

