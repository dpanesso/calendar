import React from 'react';
import Onboarding from "../../dapp/Onboarding";
import availableWallets from "../../dapp/wallets";

type Props = {
  isVisible: boolean,
  onOnboardingDone: Function,
}

const OnboardingComponent = (props: Props) => {
  const { isVisible, onOnboardingDone } = props
  console.log("+++isVisible");
  console.log(isVisible);
  console.log(availableWallets);
  
  return (isVisible === true) ? (<Onboarding
                        wallets={availableWallets}
                        onDone={onOnboardingDone}/>) : <div></div>
}

export default OnboardingComponent;
