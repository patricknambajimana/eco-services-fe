interface Props {
  name: string;
  email: string;
}

export const ManagerAvatar = ({ name, email }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
        {name.charAt(0)}
      </div>

      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">
          {email}
        </p>
      </div>
    </div>
  );
};