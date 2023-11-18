CREATE TABLE twitch_user (
    user_id VARCHAR(10) PRIMARY KEY,
    user_login VARCHAR(32) NOT NULL,
);

CREATE TABLE auth (
    user_id VARCHAR(10) NOT NULL,
    refresh_token VARCHAR(50) NOT NULL,
    token VARCHAR(30) NOT NULL,
    CONSTRAINT FK_auth_user FOREIGN KEY(user_id) REFERENCES twitch_user(user_id)
);
CREATE UNIQUE INDEX idx_user_id ON auth(user_id);

CREATE TABLE websocket_id (
    user_id VARCHAR(10) NOT NULL,
    identifier VARCHAR(36) NOT NULL,
    CONSTRAINT FK_websocket_user FOREIGN KEY(user_id) REFERENCES twitch_user(user_id)
);
CREATE UNIQUE INDEX idx_websocket_user_id ON websocket_id(user_id);

--configurations
--configuration only exists for entries that have
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE configuration_source AS ENUM ('channel_reward'); 
CREATE TABLE configurations (
    config_id UUID DEFAULT Uuid_generate_v4() NOT NULL, -- INDEX
    user_id VARCHAR(10) NOT NULL, -- as owner
    source configuration_source NOT NULL,
    config JSONB,
    CONSTRAINT FK_config_user FOREIGN KEY(user_id) REFERENCES twitch_user(user_id)
);
CREATE UNIQUE INDEX idx_configurations_id ON configurations(config_id);
CREATE UNIQUE INDEX idx_configurations_user_id ON configurations(user_id);

