import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { State, User, useResourcesByQueue, useStatus } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';
import { palette } from '../../theme/palette';
import { ResourceListItem } from '../../components/resource-list-item/resource-list-item';
import { Text } from '../../components';

const { hasAudience } = User;

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderColor: palette.white,
    borderRadius: 10,
    borderWidth: 6,
    marginBottom: 10,
  },
  cardHeader: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  cardHeaderTitle: {
    fontSize: 18,
    marginLeft: 5,
  },
});

function CardHeader(props) {
  const { title, icon } = props;
  return (
    <View style={styles.cardHeader}>
      {icon}
      <Text style={styles.cardHeaderTitle}>{title}</Text>
    </View>
  );
}

export const ResourceCard = ({ collapsing = true, ...props }) => {
  const status = useStatus();
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
      {/** Header Component */}
      <CardHeader title={cardTitle} icon={props.icon} />

      {status.isSuccess && resources.length > 0 && (
        <FlatList
          data={resources}
          renderItem={({ item }) => (
            <ResourceListItem
              resource={item}
              itStatus={status}
              eventAction="resources"
              eventCategory="resources"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={status}
          listKey={props.categ}
        />
      )}
    </View>
  );
};
