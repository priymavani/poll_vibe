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
  polls = [
    { label: "sdfsfs", votes: 3, percentage: 60 },
    { label: "sdfsd", votes: 2, percentage: 40 }
  ],
  theme = 'default'
}) => {
  const totalVotes = polls.reduce((sum, poll) => sum + poll.votes, 0);
  const themeColors = COLOR_THEMES[theme] || COLOR_THEMES.default;

  return (
    <div className="w-full max-w-md space-y-4 p-4 bg-[#8e51ff13] rounded-lg shadow-md">
      {polls.map((poll, index) => {
        const themeColor = themeColors.options[index] || themeColors.options[0];
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${themeColor.textColor}`}>
                {poll.label}
              </span>
              <Badge variant="secondary">{poll.votes} votes</Badge>
            </div>
            <Progress 
              value={poll.percentage} 
              className={`h-2 ${themeColor.color}`} 
              indicatorClassName={themeColor.color}
            />
            <div className="text-sm text-muted-foreground text-right">
              {poll.percentage}%
            </div>
          </div>
        );
      })}
      <div className="text-center text-sm text-muted-foreground">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

export default ResultSlider;