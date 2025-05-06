package modules.M5_Advanced_DSA_1.L3_Arrays_3_Interview_Problems.Assignment;

import java.util.ArrayList;

public class Assignment1 {

  ArrayList<Interval> insert(ArrayList<Interval> intervals, Interval newInterval) {
    int N = intervals.size();
    ArrayList<Interval> ans = new ArrayList<>();

    for (int index = 0; index < N; index++) {
      Interval interval = intervals.get(index);
      if (interval.end < newInterval.start) {
        ans.add(interval);
      } else if (interval.start > newInterval.end) {
        ans.add(newInterval);

        for (int jIndex = index; jIndex < N; jIndex++) {
          ans.add(intervals.get(jIndex));
        }
        return ans;
      } else {
        newInterval.start = Math.min(newInterval.start, interval.start);
        newInterval.end = Math.max(newInterval.end, interval.end);
      }
    }

    ans.add(newInterval);
    return ans;
  }
}
