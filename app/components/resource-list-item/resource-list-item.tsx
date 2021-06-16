import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking, Modal, Alert, Pressable, Image } from 'react-native';
import { fal, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { faExclamationCircle as faExclamationCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Helpers } from '@osu-wams/utils';
import { palette } from '../../theme/palette';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import boxSync from '../../../assets/logo-box-sync.png';
import canvasLogo from '../../../assets/logo-canvas.png';
import gDrive from '../../../assets/logo-drive.png';
import gMail from '../../../assets/logo-gmail.png';
import zoom from '../../../assets/logo-zoom.png';
import { ResourceListItemProps } from './resource-list-item.props';
import { Text } from '..';

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    marginBottom: 10,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
  imageIcon: {
    height: 26,
    width: 26,
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
    backgroundColor: palette.white,
    borderRadius: 20,
    elevation: 15,
    margin: 20,
    padding: 35,
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  textStyle: {
    color: palette.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

library.add(fal, fab);

const logoMapping = {
  'logo-box-sync': boxSync,
  'logo-canvas': canvasLogo,
  'logo-drive': gDrive,
  'logo-gmail': gMail,
  'logo-zoom': zoom,
};

const IconLookup = (iconName, color) => {
  if (iconName) {
    const iconSplit = iconName.split('.');
    if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
      const lookupIconDefinition: IconDefinition = findIconDefinition({
        prefix: iconSplit[0],
        iconName: iconSplit[1],
      });
      return <FontAwesomeIcon icon={lookupIconDefinition} color={color} size={26} />;
    } else if (iconSplit[0] === 'osu') {
      return (
        <Image
          source={logoMapping[iconSplit[1]]}
          accessibilityLabel={iconSplit[1]}
          style={styles.imageIcon}
        />
      );
    } else {
      return <FontAwesomeIcon icon={fal.faCube} color={color} size={26} />;
    }
  }
  return <FontAwesomeIcon icon={fal.faCube} color={color} size={26} />;
};

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
      underlayColor="#ddddd"
      onPress={() => {
        if (itSystemStatus.details && itSystemStatus.details.status !== 1) {
          setModalVisible(true);
        } else {
          Linking.openURL(link);
        }
      }}
    >
      <View style={styles.cardListItem}>
        {IconLookup(iconName, palette.black)}
        <Text style={{ marginLeft: 12, fontSize: 18 }}>{title}</Text>
        {itSystemStatus.details && itSystemStatus.details.status !== 1 && (
          <FontAwesomeIcon
            icon={faExclamationCircleSolid}
            size={20}
            color="#ffdd54"
            style={{ marginLeft: 5, marginTop: 2 }}
          />
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
                <FontAwesomeIcon icon={faExclamationCircleSolid} size={24} color="#ffdd54" />
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
