package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L7_Arrays_Subarrays.Assignment;

import java.util.ArrayList;

public class Assignment7 {
  public static ArrayList<ArrayList<Integer>> solve(ArrayList<Integer> A) {
    int N = A.size();
    ArrayList<ArrayList<Integer>> ans = new ArrayList<>();

    for (int index = 0; index < N; index++) {
      for (int jIndex = index; jIndex < N; jIndex++) {
        ArrayList<Integer> subarray = new ArrayList<>();

        for (int kIndex = index; kIndex <= jIndex; kIndex++) {
          subarray.add(A.get(kIndex));
        }

        ans.add(subarray);
      }
    }

    return ans;
  }
}
