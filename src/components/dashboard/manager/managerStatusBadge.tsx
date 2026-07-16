import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/utils/managerHelpers";

interface Props {
  status: string;
}

export const ManagerStatusBadge = ({ status }: Props) => {
  return (
    <Badge className={getStatusColor(status)}>
      {status}
    </Badge>
  );
};