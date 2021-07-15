import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Icon } from '../icon/icon';
import Dialog from '../dialog/Dialog';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { Button, CloseButton } from '../button/button';
// import { Event } from 'src/util/gaTracking';
import { Types } from '@osu-wams/lib';
import { State } from '@osu-wams/hooks';
import { useRecoilValue } from 'recoil';
import { Text } from '../text/text';
import { InfoButonProps } from './info-button.props';

const DialogHeader = styled.View({
  display: 'flex',
  flexDirection: 'row',
});

const DialogClose = styled(CloseButton)({
  padding: 0,
});

const DialogTitle = styled(Text)({
  flexGrow: 2,
  fontSize: 20,
});

const DialogContent = styled(Text)({
  fontSize: 14,
});

const InfoButton = (props: InfoButonProps) => {
  const themeContext = useContext(ThemeContext);
  const infoButtonData = useRecoilValue(State.infoButtonState);
  const [dialogVisible, toggleDialog] = useState(false);
  const [currentButton, setButton] = useState<Types.InfoButtonState | null>(null);

  useEffect(() => {
    if (Array.isArray(infoButtonData)) {
      const thisButton = infoButtonData.find((i) => i.id === props.infoButtonId);
      if (thisButton) {
        setButton(thisButton);
      }
    }
  }, [infoButtonData, props.infoButtonId]);

  return currentButton ? (
    <View>
      <Button
        bg={themeContext.ui.button.info.background}
        onPress={() => {
          toggleDialog(true);
          // Event('info-button', currentButton.title);
        }}
      >
        <Icon icon={faInfoCircle} size={26} color={themeContext.ui.button.info.icon.color} />
      </Button>
      <Dialog onDismiss={() => toggleDialog(false)} visible={dialogVisible}>
        <DialogHeader>
          <DialogTitle>{currentButton.title}</DialogTitle>
          <DialogClose onPress={() => toggleDialog(false)} />
        </DialogHeader>
        <DialogContent text={currentButton.content} />
      </Dialog>
    </View>
  ) : (
    <></>
  );
};

export default InfoButton;
