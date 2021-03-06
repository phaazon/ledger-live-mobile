/* @flow */
import React, { PureComponent } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Trans } from "react-i18next";
import colors from "../../../colors";
import TrackScreen from "../../../analytics/TrackScreen";
import LText from "../../../components/LText";
import Touchable from "../../../components/Touchable";
import IconArrowRight from "../../../icons/ArrowRight";
import Button from "../../../components/Button";
import { urls } from "../../../config/urls";
import { withOnboardingContext } from "../../Onboarding/onboardingContext";
import type { OnboardingStepProps } from "../../Onboarding/types";
import DeviceNanoAction from "../../../components/DeviceNanoAction";
import getWindowDimensions from "../../../logic/getWindowDimensions";

const hitSlop = {
  top: 16,
  left: 16,
  right: 16,
  bottom: 16,
};

const { width } = getWindowDimensions();

class ReadOnlyNanoX extends PureComponent<OnboardingStepProps> {
  buy = () => Linking.openURL(urls.buyNanoX);
  onboarding = async () => {
    this.props.setShowWelcome(false);
    this.props.setFirstTimeOnboarding(false);
    this.props.navigation.navigate("OnboardingStepChooseDevice", {
      goingBackToScreen: "Manager",
      autoJumpToNanoX: true,
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <TrackScreen category="Manager" name="ReadOnlyNanoX" />
        <View style={styles.image}>
          <DeviceNanoAction screen="empty" width={width * 0.8} />
        </View>

        <LText secondary semiBold style={styles.title}>
          <Trans i18nKey="manager.readOnly.question" />
        </LText>
        <LText style={styles.desc}>
          <Trans i18nKey="manager.readOnly.description" />
        </LText>
        <Button
          event="ReadOnlyOnboarding"
          type="primary"
          containerStyle={styles.button}
          title={<Trans i18nKey="manager.readOnly.button" />}
          onPress={this.onboarding}
        />

        <View style={styles.sub}>
          <LText style={styles.subText}>
            <Trans i18nKey="manager.readOnly.noDevice" />
          </LText>
          <Touchable
            event="ReadOnlyBuy"
            onPress={this.buy}
            style={styles.buyTouch}
            hitSlop={hitSlop}
          >
            <LText semiBold style={[styles.subText, styles.buy]}>
              <Trans i18nKey="manager.readOnly.buy" />
            </LText>
            <IconArrowRight size={16} color={colors.live} />
          </Touchable>
        </View>
      </View>
    );
  }
}

export default withOnboardingContext(ReadOnlyNanoX);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
  },
  body: {
    alignItems: "center",
  },
  receiveButton: {
    width: 290,
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
  },
  desc: {
    color: colors.grey,
    textAlign: "center",
    marginBottom: 32,
  },
  buy: {
    marginLeft: 5,
    color: colors.live,
  },
  button: {
    width: "100%",
  },
  buyTouch: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginBottom: 32,
    marginHorizontal: 7,
  },
  subText: {
    fontSize: 14,
    color: colors.grey,
  },
  sub: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
});
