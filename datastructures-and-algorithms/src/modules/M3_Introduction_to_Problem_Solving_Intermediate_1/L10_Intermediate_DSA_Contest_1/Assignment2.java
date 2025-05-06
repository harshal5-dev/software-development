package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L10_Intermediate_DSA_Contest_1;

public class Assignment2 {

  int solve(int[] A) {
    int ans = 0;
    int length = 0;

    for (int ele: A) {
      length = (ele % 2 == 1) ? length + 1 : 0;
      ans = Math.max(ans, length);
    }

    return ans;
  }
}
