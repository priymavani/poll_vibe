import React from 'react';
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Color themes for polls
const COLOR_THEMES = {
  default: {
    options: [
      { color: "bg-red-500", textColor: "text-red-500" },
      { color: "bg-green-500", textColor: "text-green-500" }
    ]
  },
  corporate: {
    options: [
      { color: "bg-blue-600", textColor: "text-blue-600" },
      { color: "bg-indigo-600", textColor: "text-indigo-600" }
    ]
  },
  pastel: {
    options: [
      { color: "bg-pink-300", textColor: "text-pink-500" },
      { color: "bg-teal-300", textColor: "text-teal-500" }
    ]
  }
};

const ResultSlider = ({
  polls,
  theme = 'default'
}) => {
  const totalVotes = polls?.reduce((sum, poll) => sum + poll.votes, 0);
  const themeColors = COLOR_THEMES[theme] || COLOR_THEMES.default;

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 p-3 sm:p-4 bg-[#8e51ff34] rounded-lg shadow-md">
      {polls?.map((poll, index) => {
        const themeColor = themeColors.options[index] || themeColors.options[0];
        return (
          <div key={index} className="space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className={`text-sm font-medium ${themeColor.textColor} flex-grow`}>
                {poll.label}
              </span>
              <Badge variant="secondary" className="self-start sm:self-auto">
                {poll.votes} votes
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Progress
                value={poll.percentage}
                className={`h-2 flex-grow ${themeColor.color}`}
                indicatorClassName={themeColor.color}
              />
              <div className="text-sm text-muted-foreground w-12 text-right">
                {poll.percentage}%
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-center text-sm text-white">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

export default ResultSlider;