package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L5_Arrays_Prefix_Sum.Assignment;

public class Assignment4 {

  static int[] solve(int[] A) {
    int N = A.length;
    int[] prefixSum = new int[N];

    prefixSum[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixSum[index] = prefixSum[index - 1] + A[index];
    }

    return prefixSum;
  }
}
