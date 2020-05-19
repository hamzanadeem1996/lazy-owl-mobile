import React from 'react';
import { StatusBar } from 'react-native';
import { colors, wp } from "../../screens/introduction/slider/styles/index.style.js";
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { TopNavigation } from "../../components/TopNavigation.js";

const StatusHeight = StatusBar.currentHeight;
export default class TransactionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let deposit = [
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
        ]
        return(
            
            <ApplicationProvider {...eva} theme={eva.light}>
                
                <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                    <Block style={{marginTop: StatusHeight, marginHorizontal: wp(1)}}>
                    
                        <Block style={{marginTop: "5%", alignItems: "center"}}>
                            <Text size={20} color={colors.mainColor}><Icon name="credit-card" size={20} /> Payment History</Text>
                        </Block>

                        <Block style={{marginTop: "5%"}}>
                            <TopNavigation 
                                deposit={deposit}
                                walletTraansactions={deposit}
                             />
                        </Block>
                    </Block>
                </Block>
            </ApplicationProvider>
                    
        );
    }
}
