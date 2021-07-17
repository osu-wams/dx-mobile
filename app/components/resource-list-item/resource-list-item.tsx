import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking, Modal, Alert, Pressable } from 'react-native';
import { faExclamationCircle as faExclamationCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Helpers } from '@osu-wams/utils';
import { Color } from '@osu-wams/theme';
import { palette } from '../../theme/palette';
import { ResourceListItemProps } from './resource-list-item.props';
import { Icon, Text } from '..';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: Color['roguewave-400'],
  },
  cardListItem: {
    flexDirection: 'row',
    padding: 10,
  },
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitleText: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: 20,
    elevation: 15,
    margin: 20,
    padding: 35,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  resourceTitle: {
    fontSize: 18,
    marginLeft: 4,
  },
  textStyle: {
    color: Color.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const ResourceListItem = (props: ResourceListItemProps) => {
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
      activeOpacity={0.6}
      underlayColor={Color['neutral-800']}
      onPress={() => {
        if (itSystemStatus.details && itSystemStatus.details.status !== 1) {
          setModalVisible(true);
        } else {
          Linking.openURL(link);
        }
      }}
    >
      <View style={styles.cardListItem}>
        <Icon iconName={iconName} color={palette.black} />
        <Text style={styles.resourceTitle}>{title}</Text>
        {itSystemStatus.details && itSystemStatus.details.status !== 1 && (
          <Icon icon={faExclamationCircleSolid} color="#ffdd54" size={18} />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {itSystemStatus.details && itSystemStatus.details.status !== 1 && (
                <Icon icon={faExclamationCircleSolid} color="#ffdd54" size={18} />
              )}
              <Text style={styles.modalTitleText}>This resource may be unavailable.</Text>
              <Text style={styles.modalText}>
                {title ?? 'Resource'} •{' '}
                {itSystemStatus.timeChecked?.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                }) +
                  ' on ' +
                  Helpers.format(itSystemStatus.timeChecked ?? new Date())}
              </Text>
              {itSystemStatus.details && (
                <Text style={styles.modalText}>{itSystemStatus.details.statusText}</Text>
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  Linking.openURL(link);
                }}
              >
                <Text style={styles.textStyle}>Continue to link</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Dismiss</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableHighlight>
  );
};
