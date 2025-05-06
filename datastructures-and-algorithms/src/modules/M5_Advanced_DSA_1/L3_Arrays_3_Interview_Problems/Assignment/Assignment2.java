package modules.M5_Advanced_DSA_1.L3_Arrays_3_Interview_Problems.Assignment;

import java.util.ArrayList;

public class Assignment2 {

  ArrayList<Interval> merge(ArrayList<Interval> intervals) {
    int N = intervals.size();
    ArrayList<Interval> ans = new ArrayList<>();

    intervals.sort((i1, i2) -> i1.start == i2.start ? i1.end - i2.end : i1.start - i2.start);
    Interval prevInterval = intervals.getFirst();

    for (int index = 1; index < N; index++) {
      Interval interval = intervals.get(index);

      if (interval.start > prevInterval.end) {
        ans.add(prevInterval);
        prevInterval = interval;
      } else {
        prevInterval.start = Math.min(prevInterval.start, interval.start );
        prevInterval.end = Math.max(prevInterval.end, interval.end);
      }
    }

    ans.add(prevInterval);
    return ans;
  }
}
