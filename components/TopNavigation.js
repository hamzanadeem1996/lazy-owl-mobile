import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Tab, TabBar, TabView, Layout, Divider, List, ListItem, Button } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, Text } from 'galio-framework';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";

export const TopNavigation = (data) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const renderItemIcon = (props) => (
    <Icon name='star' size={16} />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => rightSide(item)}
    />
  );

  return (
    
    <TabView
      indicatorStyle={{backgroundColor: "#922c88"}}
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title={<Text color={colors.mainColor}>DEPOSIT</Text>}>
        <Layout>
          <List
              data={data.deposit}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
          />
        </Layout>
      </Tab>
      
    {/* <Tab title={<Text color={colors.mainColor}>WALLET TRANSACTIONS</Text>}>
        <Layout>
          <List
              data={data.wallet}
              ItemSeparatorComponent={Divider}
              renderItem={enderItem}
          />
        </Layout>
      </Tab> */}
    </TabView>
  );
};



function rightSide(data) {
  return (
    <Block style={{display: "flex", flexDirection: "row"}}>
        <Text style={{paddingTop: "2.2%"}}>${data.amount}</Text>
        <Button onPress={() => handleReceipt(data.receipt)} size='tiny' style={{backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginLeft: "5%"}}>RECEIPT</Button>
    </Block>
  );
}

function handleReceipt(url) {
  Linking.openURL(url);
}



