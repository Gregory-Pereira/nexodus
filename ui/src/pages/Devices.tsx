import { Fragment } from "react";
import {
  Datagrid,
  List,
  TextField,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  ReferenceField,
  useRecordContext,
  useGetOne,
  Loading,
  BulkExportButton,
  BulkDeleteButton,
} from "react-admin";

const ZoneNameFromPeer = () => {
  const peer = useRecordContext();
  if (!peer) return null;
  const {
    data: zone,
    isLoading,
    error,
  } = useGetOne("zones", { id: peer.zone_id });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }
  return <div>{zone.name}</div>;
};

const DeviceListBulkActions = () => (
  <Fragment>
    <BulkExportButton />
    <BulkDeleteButton />
  </Fragment>
);

export const DeviceList = () => (
  <List>
    <Datagrid rowClick="show" bulkActionButtons={<DeviceListBulkActions />}>
      <TextField label="Hostname" source="hostname" />
      <TextField label="Tunnel IP" source="tunnel_ip" />
      <TextField label="Endpoint IP" source="local_ip" />
      <ReferenceField
        label="User"
        source="user_id"
        reference="users"
        link="show"
      />
    </Datagrid>
  </List>
);

export const DeviceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField label="ID" source="id" />
      <TextField label="Hostname" source="hostname" />
      <TextField label="Allowed IPs" source="allowed_ips" />
      <TextField label="Tunnel IP" source="tunnel_ip" />
      <TextField label="Local IP" source="local_ip" />
      <TextField label="Organization Prefix" source="organization_prefix" />
      <TextField label="Relay Node" source="relay" />
      <ReferenceField
        label="User"
        source="user_id"
        reference="users"
        link="show"
      />
      <TextField label="Public Key" source="public_key" />
      <ReferenceArrayField label="Peers" source="peers" reference="peers">
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField label="ID" source="id" />
          <TextField label="IP Address" source="allowed_ips" />
        </Datagrid>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);
