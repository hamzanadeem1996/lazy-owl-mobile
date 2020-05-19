import React from 'react';
import { StyleSheet } from 'react-native';
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

  const renderItemAccessory = (props) => (
    <Block style={{display: "flex", flexDirection: "row"}}>
        <Text style={{paddingTop: "2.2%"}}>$5678</Text>
        <Button size='tiny' style={{backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginLeft: "5%"}}>RECEIPT</Button>
    </Block>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
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
      
    <Tab title={<Text color={colors.mainColor}>WALLET TRANSACTIONS</Text>}>
        <Layout>
          <List
              data={data.deposit}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
          />
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    // height: 64,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

