import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { RepoBranches } from "../../api/github";
import { MenuInfo } from "rc-menu/lib/interface";

type Props = {
  branches?: RepoBranches;
  current?: string;
  disabled?: boolean;
  onClick: (branch: string) => void;
};

export default function BranchesDropdown(props: Props) {
  const { branches, current, disabled, onClick } = props;

  const items = React.useMemo(
    () =>
      (branches || []).map((branch) => ({
        label: branch.name,
        key: branch.name,
      })),
    [branches]
  );

  const menuProps = {
    items,
    onClick: (info: MenuInfo) => {
      onClick(info.key);
    },
  };

  return (
    <Dropdown menu={menuProps} disabled={disabled}>
      <Button loading={!branches}>
        <Space>
          {current}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}
