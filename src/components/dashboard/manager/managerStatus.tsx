import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  active: number;
  inactive: number;
}

export const ManagerStats = ({
  total,
  active,
  inactive,
}: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <p>Total Managers</p>
          <h2 className="text-3xl font-bold">
            {total}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p>Active</p>
          <h2 className="text-3xl font-bold text-green-600">
            {active}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p>Inactive</p>
          <h2 className="text-3xl font-bold text-red-600">
            {inactive}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
};