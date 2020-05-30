import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text } from 'galio-framework';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar } from "react-native";
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { TopNavigationTasks } from "../../components/TopNavigationTasks.js";
import * as services from "../../services/UserServices.js";

const StatusHeight = StatusBar.currentHeight;

export default class MyTasksScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showEditSection: false,
            showLoader: false,
            userRole: null,
            activeTasks: null,
            completedTasks: null,
            discardedTasks: null
        }
    }

    componentDidMount = async () => {
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        this.setState({userRole: user.role});

        let data = {
            id: user.id,
            token: user.token
        }

        services.getUserTasks(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                this.setState({activeTasks: response.projects.active_projects, completedTasks: response.projects.completed_projects, discardedTasks: response.projects.discarded_projects});
            }
        })
    }


    render() {

        let { activeTasks, completedTasks, discardedTasks } = this.state;

        let deposit = [
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
        ]

        return(
            <ApplicationProvider {...eva} theme={eva.light}>
                <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                    <Block style={{top: StatusHeight}}>
                        <Block style={{marginTop: "5%", alignItems: "center"}}>
                            <Text size={20} color={colors.mainColor}>My Tasks</Text>
                        </Block>

                        <Block style={{marginTop: "3%"}}>
                            <TopNavigationTasks
                                {...this.props}
                                active={activeTasks}
                                completed={completedTasks}
                                discarded={discardedTasks}
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