import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { State, User, useResourcesByQueue, useStatus } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue } from 'recoil';
import { ResourceListItem } from '../../components/resource-list-item/resource-list-item';
import { Card } from '../../components/card/Card';
import CardHeader from '../../components/card/CardHeader';
import { Icon } from '../../components';
import CardFooter from '../../components/card/CardFooter';
import CardContent from '../../components/card/CardContent';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { InternalLink } from '../../components/link/link';
import { ScreenNames } from '../../navigators';

const { hasAudience } = User;

export const ResourceCard: FC<{ categ: string; icon: IconDefinition; collapsing: boolean }> = ({
  categ,
  icon,
  collapsing = true,
}) => {
  // TODO: Remove this when it's replaced higher in the component tree
  const status = useStatus();
  const res = useResourcesByQueue(categ);
  const user = useRecoilValue(State.userState);

  const [resources, setResources] = useState<Types.Resource[]>([]);
  const [cardTitle, setCardTitle] = useState(' ');

  // TODO: Might not be needed, InternalLink component below could hold state for user dashboard?
  // const dashboardLink = `/${User.getAffiliation(user.data).toLowerCase()}`;

  // For employee_featured, we don't want the employee part...
  if (categ.split('_')[1]) {
    categ = categ.split('_')[1];
  }

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
    <Card collapsing={collapsing}>
      <CardHeader title={cardTitle} badge={icon ? <Icon icon={icon} /> : null} />

      <CardContent>
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
            listKey={categ}
          />
        )}
      </CardContent>
      {resources?.length > 0 && (
        <CardFooter infoButtonId={`${categ}-resources`}>
          <InternalLink
            to={{ name: ScreenNames.Resources, params: { category: categ.toLowerCase() } }}
            text={`View more ${categ} resources`}
          />
        </CardFooter>
      )}
    </Card>
  );
};
