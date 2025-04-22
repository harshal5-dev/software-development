package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L7_Arrays_Subarrays.Assignment;

public class Assignment6 {

  static long subarraySum(int[] A) {
    long ans = 0;
    int N = A.length;

    for (int index = 0; index < N; index++) {
      long contributionCount = (long) (index + 1) * (N - index);
      ans += A[index] * contributionCount;
    }

    return ans;
  }
}
