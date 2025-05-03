package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Lecture;

public class BoundaryClockwise {

  static void printBoundaryClockwise(int[][] A, int index, int jIndex) {
    index = 0;
    jIndex = 0;
    int N = A.length;

    if (N == 1) {
      System.out.print(A[index][jIndex] + " ");
      return;
    }

    for (int k = 1; k < N; k++) {
      System.out.print(A[index][jIndex] + " ");
      jIndex++;
    }

    System.out.println();

    for (int k = 1; k < N; k++) {
      System.out.print(A[index][jIndex] + " ");
      index++;
    }

    System.out.println();

    for (int k = 1; k < N; k++) {
      System.out.print(A[index][jIndex] + " ");
      jIndex--;
    }

    System.out.println();

    for (int k = 1; k < N; k++) {
      System.out.print(A[index][jIndex] + " ");
      index--;
    }
  }
}
