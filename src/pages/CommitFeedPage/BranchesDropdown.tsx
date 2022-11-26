import React from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

type Props = {
  branches?: any[];
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
    onClick: (event: any) => {
      onClick(event.key);
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
