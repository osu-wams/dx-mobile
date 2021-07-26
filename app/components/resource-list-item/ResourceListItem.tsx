import React, { useState, useEffect, useContext } from 'react';
import { View, Linking, Pressable } from 'react-native';
import {
  faExclamationCircle as faExclamationCircleSolid,
  faHeart as faSolidHeart,
} from '@fortawesome/pro-solid-svg-icons';
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Types } from '@osu-wams/lib';
import { Helpers } from '@osu-wams/utils';
import { Resources, State } from '@osu-wams/hooks';
import { Color, fontSize } from '@osu-wams/theme';
import { ResourceListItemProps } from './resource-list-item.props';
import { Checkbox, Icon, Text } from '..';
import styled, { ThemeContext } from 'styled-components/native';
import { spacing } from '../../theme';
import Dialog from '../dialog/Dialog';
import { HEADER_NAV_HEIGHT } from '../../ui/Header';
import { useRecoilValue } from 'recoil';

const ResourceListItemContainer = styled(View)({
  flexDirection: 'row',
  padding: spacing.medium + 2,
  paddingLeft: spacing.large,
  paddingRight: spacing.large,
});

const ResourceListItemBase = styled(View)({
  flexDirection: 'row',
});

const ResourceTitle = styled(Text)<{ narrow: boolean }>(({ narrow }) => ({
  fontSize: fontSize[18],
  marginLeft: spacing.small,
  maxWidth: narrow ? '75%' : '88%',
}));

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

const isFavorite = (resId: string, favs: Types.FavoriteResource[]) => {
  const res: Types.FavoriteResource | undefined = favs.find(
    (r: Types.FavoriteResource) => r.resourceId === resId,
  );
  return res?.active || false;
};

// Adds or removes a resource from FavoriteResource and refreshes the cache to get new list
const updateFavorites = async (
  user: Types.UserState,
  resource: Types.Resource,
  favs: boolean,
  index?: number,
) => {
  await Resources.postFavorite([{ resourceId: resource.id, active: favs, order: index ?? 999 }]);
  if (user.refreshFavorites) await user.refreshFavorites();
  // TODO: Add GA Event
  // Event('favorite-resource', resource.id, favoriteLabelText(favs));
};

// Heart Icon to Favorite or unfavorite the Resources
const FavHeart = (props: {
  resource: Types.Resource;
  favs: boolean;
  onToggle?: (newValue: boolean) => void;
}) => (
  <Checkbox
    icon={<Icon icon={faHeart} size={18} />}
    checkedIcon={<Icon icon={faSolidHeart} color={Color['orange-400']} size={18} />}
    value={props.resource.id}
    checked={props.favs}
    onToggle={props.onToggle}
  />
);

export const ResourceListItem = (props: ResourceListItemProps) => {
  const theme = useContext(ThemeContext);
  const { title, link, itSystem, iconName } = props.resource;
  const { data, isSuccess } = props.itStatus;
  const user = useRecoilValue(State.userState);
  const [favs, setFav] = useState(false);

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

  useEffect(() => {
    if (props.resource.id && user.data.favoriteResources) {
      setFav(isFavorite(props.resource.id, user.data.favoriteResources));
    }
  }, [user.data.favoriteResources, props.resource.id]);

  return (
    <ResourceListItemContainer>
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
          <ResourceTitle narrow={itSystemStatus.details && itSystemStatus.details?.status !== 1}>
            {title}
          </ResourceTitle>
          {itSystemStatus.details && itSystemStatus.details.status !== 1 && (
            <Icon
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{ alignItems: 'center', paddingLeft: 5 }}
              icon={faExclamationCircleSolid}
              color="#ffdd54"
              size={18}
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
      <FavHeart
        resource={props.resource}
        favs={favs}
        onToggle={() => {
          setFav(!favs);
          updateFavorites(user, props.resource, !favs, props.index);
        }}
      />
    </ResourceListItemContainer>
  );
};
