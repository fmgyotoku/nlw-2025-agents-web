import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rooms</CardTitle>
        <CardDescription>
          Quick access to the rooms created recently
        </CardDescription>
        <CardContent className="flex flex-col gap-3">
          {isLoading && (
            <p className="text-muted-foreground text-sm">Loading rooms ...</p>
          )}

          {data?.map((room) => {
            return (
              <Link
                key={room.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50"
                to={`/room/${room.id}`}
              >
                <div className="flex-1">
                  <h3 className="font-medium">{room.name}</h3>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {dayjs(room.createdAt).toNow()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {room.questionsCount} question(s)
                    </Badge>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm">
                  Enter
                  <ArrowRight className="size-3" />
                </span>
              </Link>
            );
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
