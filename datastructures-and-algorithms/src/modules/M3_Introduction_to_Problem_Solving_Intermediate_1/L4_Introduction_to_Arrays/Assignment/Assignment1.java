package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L4_Introduction_to_Arrays.Assignment;

public class Assignment1 {

  int solve(int[] A) {
    int maxValue = Integer.MIN_VALUE;
    int ans = 0;

    for (int ele: A) {
      maxValue = Math.max(maxValue, ele);
    }

    for (int ele: A) {
      if (ele < maxValue) {
        ans++;
      }
    }

    return ans;
  }
}
