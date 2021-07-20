import React, { useState, useEffect, useContext } from 'react';
import { View, Linking, Pressable } from 'react-native';
import { faExclamationCircle as faExclamationCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Helpers } from '@osu-wams/utils';
import { Color, fontSize } from '@osu-wams/theme';
import { ResourceListItemProps } from './resource-list-item.props';
import { Icon, Text } from '..';
import styled, { ThemeContext } from 'styled-components/native';
import { spacing } from '../../theme';
import Dialog from '../dialog/Dialog';
import { HEADER_NAV_HEIGHT } from '../../ui/Header';

const ResourceListItemBase = styled(View)({
  flexDirection: 'row',
  padding: spacing.medium + 2,
  paddingLeft: spacing.large,
  paddingRight: spacing.large,
});

const ResourceTitle = styled(Text)({
  fontSize: fontSize[18],
  marginLeft: spacing.small,
});

const Centered = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: HEADER_NAV_HEIGHT,
});

const ModalContent = styled(View)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.ui.myDialog.background,
  borderRadius: spacing.unit,
  elevation: '15',
  padding: spacing.large,
  shadowColor: Color.black,
  shadowOpacity: '0.8',
  shadowRadius: 14,
}));

const CenteredText = styled(Text)<{ fg?: string }>(({ fg, theme }) => ({
  color: fg ?? theme.ui.myDialog.details.color,
  textAlign: 'center',
}));

const ModalText = styled(CenteredText)({
  marginBottom: spacing.unit,
});

const ModalCloseButton = styled(Pressable)({
  backgroundColor: Color['roguewave-400'],
  borderRadius: 10,
  elevation: '2',
  marginBottom: spacing.unit + 2,
  padding: spacing.unit,
});

export const ResourceListItem = (props: ResourceListItemProps) => {
  const theme = useContext(ThemeContext);
  const { title, link, itSystem, iconName } = props.resource;
  const { data, isSuccess } = props.itStatus;

  const [modalVisible, setModalVisible] = useState(false);
  const [itSystemStatus, setItSystemStatus] = useState<{
    details?: any;
    timeChecked?: Date;
  }>({
    details: undefined,
    timeChecked: undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      // look for the resource's corresponding IT system
      if (itSystem && data) {
        const result = data.find((system) => system.name === itSystem);

        if (itSystem && result && result.status !== 1) {
          // update IT system details and time checked
          setItSystemStatus({
            details: result,
            timeChecked: new Date(),
          });
        }
      }
    }
  }, [isSuccess]);

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={Color['neutral-100']}
      onPress={() => {
        if (itSystemStatus.details && itSystemStatus.details.status !== 1) {
          setModalVisible(true);
        } else {
          Linking.openURL(link);
        }
      }}
    >
      <ResourceListItemBase>
        <Icon iconName={iconName} />
        <ResourceTitle>{title}</ResourceTitle>
        {itSystemStatus.details && itSystemStatus.details.status !== 1 && (
          <Icon
            icon={faExclamationCircleSolid}
            color="#ffdd54"
            size={18}
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{ paddingLeft: 5 }}
          />
        )}
        <Dialog
          animationType="fade"
          solidBackground={false}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Centered>
            <ModalContent>
              <ModalText preset="bold" text="This resource may be unavailable." />
              <ModalText>
                {title ?? 'Resource'} •{' '}
                {(itSystemStatus.timeChecked ?? new Date()).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                }) +
                  ' on ' +
                  Helpers.format(itSystemStatus.timeChecked ?? new Date())}
              </ModalText>
              {itSystemStatus.details && <ModalText text={itSystemStatus.details.statusText} />}

              <ModalCloseButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                  Linking.openURL(link);
                }}
              >
                <CenteredText text="Continue to link" fg={theme.ui.myDialog.background} />
              </ModalCloseButton>
              <ModalCloseButton onPress={() => setModalVisible(!modalVisible)}>
                <CenteredText text="Dismiss" fg={theme.ui.myDialog.background} />
              </ModalCloseButton>
            </ModalContent>
          </Centered>
        </Dialog>
      </ResourceListItemBase>
    </TouchableHighlight>
  );
};
