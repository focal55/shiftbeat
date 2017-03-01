import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Easing
} from 'react-native';

class KitchenSink extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window');
        this.state = {
            windowWidth: width,
            windowHeight: height,
            bottomDrawer: {
              y: new Animated.Value(height)
            },
            rightDrawer: {
                x: new Animated.Value(width)
            },
            leftDrawer: {
                x: new Animated.Value(-1 * width)
            },
            mainContent: {
              margin: new Animated.Value(0),
              opacity: new Animated.Value(1),
              x: new Animated.Value(0)
            },
        };
    }

    handleBottomDrawerShow() {
        Animated.spring(this.state.bottomDrawer.y, {toValue: 0, friction: 10, tension: 20}).start();
    }
    handleBottomDrawerHide() {
        Animated.spring(this.state.bottomDrawer.y, {toValue: this.state.windowHeight, friction: 10, tension: 10}).start();
    }

    handleRightDrawerShow() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.mainContent.x, {toValue: (this.state.windowWidth - 50), duration: 600, easing: Easing.inOut(Easing.ease)}),
                Animated.timing(this.state.rightDrawer.x, {toValue: 50, duration: 600, easing: Easing.inOut(Easing.ease)})
            ]),
        ]).start();
    }
    handleRightDrawerHide() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.mainContent.x, {toValue: 0, duration: 300, easing: Easing.inOut(Easing.ease)}),
                Animated.timing(this.state.rightDrawer.x, {toValue: this.state.windowWidth, duration: 300, easing: Easing.inOut(Easing.ease)})
            ]),
        ]).start();
    }

    handleLeftDrawerShow() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.mainContent.margin, {toValue: 30, duration: 600, easing: Easing.inOut(Easing.ease)}),
                Animated.timing(this.state.mainContent.opacity, {toValue: 0.5, duration: 600, easing: Easing.inOut(Easing.ease)}),
                Animated.spring(this.state.leftDrawer.x, {toValue: 0, friction: 10, tension: 10})
            ]),
        ]).start();
    }
    handleLeftDrawerHide() {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.mainContent.margin, {toValue: 0, duration: 400, easing: Easing.inOut(Easing.ease)}),
                Animated.timing(this.state.mainContent.opacity, {toValue: 1, duration: 400, easing: Easing.inOut(Easing.ease)}),
                Animated.spring(this.state.leftDrawer.x, {toValue: (-1 * this.state.windowWidth), friction: 10, tension: 100})
            ]),
        ]).start();
    }

    renderRightDrawer(props) {
        if (props.rightDrawer) {
            return(
                <Animated.View style={{
                    flex: 1,
                    position: 'absolute',
                    zIndex: 10,
                    right: this.state.rightDrawer.x,
                    width: this.state.windowWidth,
                    height: this.state.windowHeight,
                }}>
                    { React.cloneElement(props.rightDrawer, {
                        closeHandler: this.handleRightDrawerHide.bind(this)
                    }) }
                </Animated.View>
            );
        }
    }

    renderLeftDrawer(props) {
        if (props.leftDrawer) {
            return(
                <Animated.View style={{
                    flex: 1,
                    position: 'absolute',
                    zIndex: 10,
                    right: this.state.leftDrawer.x,
                    width: this.state.windowWidth,
                    height: this.state.windowHeight,
                }}>
                    { React.cloneElement(props.rightDrawer, {
                        closeHandler: this.handleLeftDrawerHide.bind(this)
                    }) }
                </Animated.View>
            )
        }
    }

    renderBottomDrawer(props) {
        if (props.bottomDrawer) {
            return(
                <Animated.View style={{
                    flex: 1,
                    position: 'absolute',
                    zIndex: 10,
                    top: this.state.bottomDrawer.y,
                    width: this.state.windowWidth,
                    height: this.state.windowHeight,
                }}>
                    { React.cloneElement(props.bottomDrawer, {
                        closeHandler: this.handleBottomDrawerHide.bind(this)
                    }) }
                </Animated.View>
            )
        }
    }

    renderMainContent(props) {
        if (props.mainContent) {
            return(
                <View>
                    { React.cloneElement(props.mainContent, {
                        openRightDrawerHandler: this.handleRightDrawerShow.bind(this),
                        openLeftDrawerHandler: this.handleLeftDrawerShow.bind(this),
                        openBottomDrawerHandler: this.handleBottomDrawerShow.bind(this),
                    }) }
                </View>
            );
        }
    }

	render() {
		return (
            // Outer Wrapper
			<View style={{
			    flex: 1,
			    backgroundColor: 'black'
            }}>
                {/* Bottom Drawer */}
                {this.renderBottomDrawer(this.props)}

                {/* Right Drawer */}
                {this.renderRightDrawer(this.props)}

                {/* Left Drawer */}
                {this.renderLeftDrawer(this.props)}

                {/* Main Content */}
                <Animated.View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: this.state.mainContent.x,
                    margin: this.state.mainContent.margin,
                    opacity: this.state.mainContent.opacity,
                }}>

                    {/* Main Content */}
                    {this.renderMainContent(this.props)}

                </Animated.View>
			</View>
		)
	}
}

export default KitchenSink