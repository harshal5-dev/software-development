package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L14_Contest_1_Reattempt_1;

public class Assignment1 {

  int[] solve(int[] A, int[][] B) {
    int N = A.length;
    int[] preSum = new int[N];
    int M = B.length;
    int[] result = new int[M];

    preSum[0] = A[0] > 10 ? 1 : 0;

    for (int index = 1; index < N; index++) {
      preSum[index] = preSum[index - 1] + (A[index] > 10 ? 1 : 0);
    }

    for (int index = 0; index < M; index++) {
      int left = B[index][0] - 1;
      int right = B[index][1] - 1;
      int count = preSum[right];

      if (left > 0) {
        count -= preSum[left - 1];
      }

      result[index] = count;

    }

    return result;
  }
}
