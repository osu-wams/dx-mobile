import React, { useState, useEffect, FC } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { Text, View, StyleSheet, Linking, Modal, Alert, Pressable } from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Helpers } from '@osu-wams/utils';
import { State, User, useResourcesByQueue } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';

const { hasAudience } = User;

function CardHeader(props) {
  const { title, icon } = props;
  return (
    <View style={styles.cardHeader}>
      {icon}
      <Text style={styles.cardHeaderTitle}>{title}</Text>
    </View>
  );
}

const ResourceListItem = (props) => {
  const { title, link, itSystem } = props.item;
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
        var result = data.find((system) => system.name === itSystem);

        // change this to !== 1 when in production
        if (itSystem && result && result.status === 1) {
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
        // change this to !== 1 when in production
        if (itSystemStatus.details && itSystemStatus.details.status === 1) {
          setModalVisible(true);
        } else {
          Linking.openURL(link);
        }
      }}
    >
      <View style={styles.cardListItem}>
        <FontAwesome name="leaf" size={16} color="black" />
        <Text style={{ marginLeft: 5, fontSize: 16 }}>{title}</Text>
        {/* change this to !== 1 when in production*/}
        {itSystemStatus.details && itSystemStatus.details.status === 1 && (
          <Ionicons name="warning" size={10} color="#ffdd54" style={{ paddingLeft: 3 }} />
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
              {/* change this to !== 1 when in production*/}
              {itSystemStatus.details && itSystemStatus.details.status === 1 && (
                <Ionicons name="warning-outline" size={24} color="#ffdd54" />
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
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableHighlight>
  );
};

export const ResourceCard = ({ collapsing = true, ...props }) => {
  const status = useQuery('/api/status');
  const allResources = useQuery('/api/resources');
  const res = useResourcesByQueue(props.categ);
  const user = useRecoilValue(State.userState);

  const [resources, setResources] = useState<Types.Resource[]>([]);
  const [cardTitle, setCardTitle] = useState('');

  useEffect(() => {
    if (Object.keys(user.data).length && res.data && res.data.items.length) {
      const resourcesToUse = res.data.items.filter((r) => hasAudience(user.data, r));
      setResources(resourcesToUse);
    }
    if (res.data && res.data.entityQueueTitle) {
      const cardSuffix = res.data.entityQueueTitle.toLowerCase() === 'featured' ? '' : ' Resources';
      setCardTitle(res.data.entityQueueTitle + cardSuffix);
    }
  }, [res.data, res.isSuccess]);

  return (
    <View style={styles.card}>
      {/**Header Component */}
      <CardHeader
        title={cardTitle}
        icon={<AntDesign name="infocirlce" size={20} color="black" />}
      />

      {/**List of associated resources */}
      <FlatList
        data={resources}
        renderItem={({ item }) => <ResourceListItem item={item} itStatus={status} example={3} />}
        keyExtractor={(item) => item.id.toString()}
        extraData={status}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  cardHeaderTitle: {
    fontSize: 18,
    marginLeft: 5,
  },
  cardListItem: {
    flexDirection: 'row',
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
