package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L6_Arrays_Carry_Forward.Assignment;

import java.util.ArrayList;

public class Assignment2 {

  static ArrayList<Integer> solve(ArrayList<Integer> A) {
    ArrayList<Integer> ans = new ArrayList<>();
    int N = A.size();
    int maxValue = A.get(N - 1);
    ans.add(maxValue);

    for (int index = N -2; index >= 0; index--) {
      int element = A.get(index);
      if (element> maxValue) {
        ans.add(element);
        maxValue = element;
      }
    }

    return ans;
  }
}
