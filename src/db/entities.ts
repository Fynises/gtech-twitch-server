import { ChannelRewardConfigEntity } from './channel-reward-configuration/channel-reward-config.entity';
import { TwitchAuthEntity } from './twitch-auth/twitch-auth.entity';
import { WebsocketConfigEntity } from './websocket-config/websocket-config.entity';

const ENTITIES = [
  TwitchAuthEntity,
  ChannelRewardConfigEntity,
  WebsocketConfigEntity,
];

export default ENTITIES;
