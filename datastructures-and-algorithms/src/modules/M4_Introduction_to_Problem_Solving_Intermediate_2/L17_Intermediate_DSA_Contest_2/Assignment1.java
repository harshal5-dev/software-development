package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L17_Intermediate_DSA_Contest_2;

import java.util.ArrayList;

public class Assignment1 {

  ArrayList<Integer> solve(ArrayList<Integer> A) {
    int firstMin = Integer.MAX_VALUE;
    int secondMin = Integer.MAX_VALUE;
    int firstMinIndex = -1;
    ArrayList<Integer> ans = new ArrayList<>();
    int N = A.size();

    for (int index = 0; index < N; index++) {
      if (A.get(index) < firstMin) {
        firstMin = A.get(index);
        firstMinIndex = index;
      }
    }

    for (int index = 0; index < N; index++) {
      if (index != firstMinIndex) {
        secondMin = Math.min(secondMin, A.get(index));
      }
    }

    for (int num: A) {
      if (num > secondMin) {
        ans.add(num);
      }
    }

    return ans;
  }
}
